import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Player, PlayerId, PlayerStatus, SeatId, ServerTableState, TableId } from '@poker-moons/shared/type';
import { TurnTimerService } from '../../shared/turn-timer/turn-timer.service';
import {
    hasBiddingCycleEnded,
    hasEveryoneTakenTurn,
    incrementRoundStatus,
    incrementSeat,
} from '../../shared/util/round.util';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { DeckManagerService } from '../deck-manager/deck-manager.service';
import { WinnerDeterminerService } from '../winner-determiner/winner-determiner.service';
import { noStartingPlayer } from './round-manager.copy';

@Injectable()
export class RoundManagerService {
    constructor(
        private readonly deckManagerService: DeckManagerService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly turnTimeService: TurnTimerService,
        private readonly winnerDeterminerService: WinnerDeterminerService,
    ) {}

    /**
     * @description Initiates the next turn during a round of poker.
     *
     * - Handles incrementing the turn count and active seat
     * - Handles advancing the to the next stage of a round
     * - Handles transitioning the turn timer from one player to the next
     *
     * This method should be called in the player action handlers at the end of every turn.
     *
     * @param table - the ServerTableState and table ID
     * @param nextActiveSeat - the seat ID of the player whose turn is next
     * @param playerStatuses - the status of each player in the round
     */
    async startNextTurn(
        table: ServerTableState,
        nextActiveSeat: SeatId,
        playerStatuses: PlayerStatus[],
    ): Promise<void> {
        // Re-fetch table, because race condition with player service
        table = await this.tableStateManagerService.getTableById(table.id);

        /*
         * If everyone has taken their turn, set every active player back to 'waiting',
         * draw a new card for the table, and update the round status
         */
        if (
            hasEveryoneTakenTurn(playerStatuses) &&
            hasBiddingCycleEnded(Object.values(table.playerMap), table.activeRound)
        ) {
            const updatedPlayerMap: Record<PlayerId, Player> = {};

            for (const player of Object.values(table.playerMap)) {
                updatedPlayerMap[player.id] = {
                    ...player,
                    biddingCycleCalled: 0,
                    status: player.status === 'folded' || player.status === 'all-in' ? player.status : 'waiting',
                };
            }

            await this.tableStateManagerService.updateTable(table.id, { playerMap: updatedPlayerMap });

            // If transitioning from deal -> flop, draw 3 cards, otherwise draw only 1
            if (table.activeRound.roundStatus === 'deal') {
                const draw1 = await this.deckManagerService.drawCard(table.id, table.deck);
                const draw2 = await this.deckManagerService.drawCard(table.id, draw1.deck);
                const draw3 = await this.deckManagerService.drawCard(table.id, draw2.deck);

                table.activeRound.cards.push(draw1.card, draw2.card, draw3.card);
            } else {
                const { card } = await this.deckManagerService.drawCard(table.id, table.deck);
                table.activeRound.cards.push(card);
            }

            await this.tableStateManagerService.updateRound(table.id, {
                cards: table.activeRound.cards,
                roundStatus: incrementRoundStatus(table.activeRound.roundStatus),
                toCall: 0,
            });

            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'roundStatusChanged',
                status: incrementRoundStatus(table.activeRound.roundStatus),
                activeSeat: nextActiveSeat,
                cards: table.activeRound.cards,
                toCall: 0,
            });
        }

        // Increment the turn count and active seat and trigger the turn timer for the next player
        await Promise.all([
            this.tableStateManagerService.updateRound(table.id, {
                turnCount: table.activeRound.turnCount + 1,

                activeSeat: nextActiveSeat,
            }),
            this.turnTimeService.onTurn({
                tableId: table.id,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                currentPlayerId: table.seatMap[table.activeRound.activeSeat!]!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                nextPlayerId: table.seatMap[nextActiveSeat]!,
            }),
        ]);
    }

    /**
     * @description Starts a new round of poker.
     *
     * - Handles setting the first active seat if it hasn't already been set
     * - Handles building a new deck and dealing out cards to the players
     * - Handles initiating the first player's turn timer
     *
     * @throws {InternalServerErrorException} if there's no player in the seat next to the dealer
     *
     * @param tableId - the ID of the table the round is starting on
     */
    async startRound(tableId: TableId): Promise<void> {
        const table = await this.tableStateManagerService.getTableById(tableId);

        let activeSeat = table.activeRound.activeSeat;

        if (activeSeat == null) {
            activeSeat = incrementSeat(table.activeRound.dealerSeat, table.seatMap);

            await this.tableStateManagerService.updateRound(table.id, { activeSeat });
        }

        const startingPlayerId = table.seatMap[activeSeat];

        if (startingPlayerId == null) {
            throw new InternalServerErrorException(noStartingPlayer);
        }

        // Build a new deck for the table
        let deck = await this.deckManagerService.buildDeck(table.id);

        // Deal cards to players
        for (const player of Object.values(table.playerMap)) {
            const draw1 = await this.deckManagerService.drawCard(table.id, deck);
            const draw2 = await this.deckManagerService.drawCard(table.id, draw1.deck);

            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, {
                cards: [draw1.card, draw2.card],
            });

            deck = draw2.deck;
        }

        /*
         * Emit the RoundStatusChanged event to the frontend to reset back to 'deal'
         *
         * This also triggers each player to fetch their cards from the server
         */
        this.tableGatewayService.emitTableEvent(table.id, {
            type: 'roundStatusChanged',
            status: 'deal',
            activeSeat,
            cards: [],
            toCall: 0,
        });

        // Start the turn timer for the first player
        await this.turnTimeService.onStart({ tableId: table.id, startingPlayerId });
    }

    /**
     * @description Ends a round of poker.
     *
     * This method stops the final player's timer, handles calling the WinnerDeterminerService, and
     * then determines if the game should continue to another round.
     *
     * If the game is over (i.e. one player has all the chips) this method will update the
     * table status to ended. Otherwise, a new round is started.
     *
     * @param table - the ServerTableState
     */
    async endRound(table: ServerTableState): Promise<void> {
        // Stop the final player's timer
        await this.turnTimeService.onEnd({
            tableId: table.id,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            finalPlayerId: table.seatMap[table.activeRound.activeSeat!]!,
        });

        // Reset players to waiting at the end of the round
        table = await this.tableStateManagerService.getTableById(table.id);

        const updatedPlayerMap = table.playerMap;

        for (const player of Object.values(table.playerMap)) {
            updatedPlayerMap[player.id] = {
                ...player,
                status: 'waiting',
                roundCalled: player.biddingCycleCalled + player.roundCalled,
            };
        }

        await this.tableStateManagerService.updateTable(table.id, { playerMap: updatedPlayerMap });

        // Determine and emit winner of round and update player's stacks
        await this.winnerDeterminerService.determineWinner(table.id, table.playerMap, table.activeRound);

        // Determine if the game can continue (i.e. two or more players still have chips)
        const playerStacks = Object.values(table.playerMap).map((player) => player.stack);
        const numPlayersWithNoChipsLeft = playerStacks.reduce((index, value) => (value === 0 ? index + 1 : index), 0);

        if (numPlayersWithNoChipsLeft === playerStacks.length - 1) {
            // If only one player has chips left in their stack, update the table status to 'ended'
            await this.tableStateManagerService.updateTable(table.id, { status: 'ended' });

            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'tableStatusChanged',
                status: 'ended',
                startDate: undefined,
            });
        } else {
            /*
             * If the game can continue, set the next dealer/active seat, reset the round in state,
             * and call `startRound` to initiate the next round.
             */

            // Remove players who have no chips left from the game
            const outPlayers = Object.values(table.playerMap).filter((player) => player.stack === 0);
            for (const loser of Object.values(outPlayers)) {
                const playerUpdate: Partial<Player> = {
                    status : 'out',
                    seatId : null,
                };
                // update each player individually, or just yeet an updated seatMap?
                await this.tableStateManagerService.updateTablePlayer(table.id, loser.id, playerUpdate);
                // TODO: update readySystemService? emit a tableEvent?
            }
            const nextDealerSeat = incrementSeat(table.activeRound.dealerSeat, table.seatMap);
            const nextActiveSeat = incrementSeat(nextDealerSeat, table.seatMap);

            await this.tableStateManagerService.updateRound(table.id, {
                turnCount: 0,
                roundStatus: 'deal',
                pot: 0,
                toCall: 0,
                cards: [],
                dealerSeat: nextDealerSeat,
                activeSeat: nextActiveSeat,
            });

            await this.tableStateManagerService.updateAllPlayers(table.id, {
                status: 'waiting',
                roundCalled: 0,
                biddingCycleCalled: 0,
            });

            await this.startRound(table.id);
        }
    }
}
