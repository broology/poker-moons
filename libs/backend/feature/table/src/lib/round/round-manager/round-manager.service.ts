import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    Player,
    PlayerId,
    PlayerStatus,
    PublicPlayer,
    Round,
    SeatId,
    ServerTableState,
    TableId,
} from '@poker-moons/shared/type';
import { TurnTimerService } from '../../shared/turn-timer/turn-timer.service';
import {
    determineStartingSeat,
    hasBiddingCycleEnded,
    hasEveryoneButOneFolded,
    hasEveryoneTakenTurn,
    incrementRoundStatus,
    incrementSeat,
    isActivePlayer,
    isAutoCompletable,
    isRoundComplete,
} from '../../shared/util/round.util';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { BlindManagerService } from '../blind-manager/blind-manager.service';
import { DeckManagerService } from '../deck-manager/deck-manager.service';
import { WinnerDeterminerService } from '../winner-determiner/winner-determiner.service';
import { noStartingPlayer } from './round-manager.copy';

@Injectable()
export class RoundManagerService {
    private logger = new CustomLoggerService(RoundManagerService.name);

    constructor(
        private readonly deckManagerService: DeckManagerService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly turnTimeService: TurnTimerService,
        private readonly winnerDeterminerService: WinnerDeterminerService,
        private readonly blindManagerService: BlindManagerService,
    ) {}

    /**
     * @description Initiates the next turn during a round of poker.
     *
     * - Handles incrementing the turn count and active seat.
     * - Handles advancing the to the next stage of a round.
     * - Handles transitioning the turn timer from one player to the next.
     *
     * This method should be called in the player action handlers at the end of every turn.
     *
     * @param table - The ServerTableState and table ID.
     * @param nextActiveSeat - The seat ID of the player whose turn is next.
     * @param playerStatuses - The status of each player in the round.
     */
    async startNextTurn(
        table: ServerTableState,
        nextActiveSeat: SeatId | null,
        playerStatuses: PlayerStatus[],
    ): Promise<void> {
        let nextSeat: SeatId | null = nextActiveSeat;

        // Re-fetch table, because race condition with player service
        table = await this.tableStateManagerService.getTableById(table.id);

        /*
         * If everyone has taken their turn, set every active player back to 'waiting',
         * draw a new card for the table, and update the round status
         */
        if (
            (hasEveryoneTakenTurn(playerStatuses) &&
                hasBiddingCycleEnded(Object.values(table.playerMap), table.activeRound)) ||
            hasEveryoneButOneFolded(playerStatuses)
        ) {
            // if a round a can be auto-completed, which occurs when less than 2 players are actively bidden.
            if (isAutoCompletable(playerStatuses)) {
                await this.autoCompleteRound(table.id, table.playerMap);
                return;
            }

            const updatedPlayerMap: Record<PlayerId, Player> = {};

            for (const player of Object.values(table.playerMap)) {
                const playerChanges = {
                    roundCalled: player.biddingCycleCalled + player.roundCalled,
                    biddingCycleCalled: 0,
                    status: (player.status === 'folded' || player.status === 'all-in'
                        ? player.status
                        : 'waiting') as PlayerStatus,
                };

                updatedPlayerMap[player.id] = {
                    ...player,
                    ...playerChanges,
                };

                this.tableGatewayService.emitTableEvent(table.id, {
                    type: 'playerChanged',
                    id: player.id,
                    ...playerChanges,
                });
            }

            await this.tableStateManagerService.updateTable(table.id, { playerMap: updatedPlayerMap });

            // Determine if the round is complete
            if (isRoundComplete(table.activeRound.roundStatus, playerStatuses)) {
                return this.endRound(table);
            }

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

            nextSeat = incrementSeat(table.activeRound.dealerSeat, table.seatMap);

            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'roundChanged',
                roundStatus: incrementRoundStatus(table.activeRound.roundStatus),
                activeSeat: nextSeat,
                cards: table.activeRound.cards,
                toCall: 0,
            });
        }

        // Increment the turn count and active seat and trigger the turn timer for the next player
        await Promise.all([
            this.tableStateManagerService.updateRound(table.id, {
                turnCount: table.activeRound.turnCount + 1,
                activeSeat: nextSeat,
            }),
            this.turnTimeService.onTurn({
                tableId: table.id,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                currentPlayerId: table.seatMap[table.activeRound.activeSeat!]!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                nextPlayerId: table.seatMap[nextSeat!]!,
            }),
        ]);
    }

    /**
     * @description Draws the remaining cards for the round, bidding is complete before this is called.
     *
     * This method should be called in the player action handlers at the end of every turn.
     *
     * @param tableId - The ID of the table to auto-complete.
     * @param playerMap - The map of player IDs to player data.
     */
    async autoCompleteRound(tableId: TableId, playerMap: Record<PlayerId, Player>): Promise<void> {
        const updatedPlayerMap: Record<PlayerId, Player> = {};

        // Build set of active player ids
        const activePlayerIdSet = Object.values(playerMap).reduce((prev, player) => {
            if (isActivePlayer(player)) {
                prev.add(player.id);
            }
            return prev;
        }, new Set<string>());

        for (const player of Object.values(playerMap)) {
            //  if there is more than 1 player and this player is in the active round, then display their cards.
            const cards: PublicPlayer['cards'] | undefined =
                activePlayerIdSet.size > 1 && activePlayerIdSet.has(player.id) ? player.cards : undefined;

            this.tableGatewayService.emitTableEvent(tableId, {
                type: 'playerChanged',
                id: player.id,
                roundCalled: player.biddingCycleCalled + player.roundCalled,
                biddingCycleCalled: 0,
                ...(cards ? { cards } : {}),
            });

            updatedPlayerMap[player.id] = {
                ...player,
                roundCalled: player.biddingCycleCalled + player.roundCalled,
                biddingCycleCalled: 0,
            };
        }

        await this.tableStateManagerService.updateTable(tableId, { playerMap: updatedPlayerMap });

        let table: ServerTableState;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            table = await this.tableStateManagerService.getTableById(tableId);

            // Don't need to do anything if table is on river
            if (table.activeRound.roundStatus === 'river') {
                break;
            }

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

            const newStatus = incrementRoundStatus(table.activeRound.roundStatus);

            await this.tableStateManagerService.updateRound(table.id, {
                cards: table.activeRound.cards,
                roundStatus: newStatus,
                toCall: 0,
            });

            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'roundChanged',
                roundStatus: newStatus,
                cards: table.activeRound.cards,
                toCall: 0,
            });

            if (newStatus === 'river') {
                break;
            }
        }

        await this.endRound(table);
    }

    /**
     * @description Starts a new round of poker.
     *
     * - Handles setting the first active seat.
     * - Handles building a new deck and dealing out cards to the players.
     * - Handles initiating the first player's turn timer.
     *
     * @param tableId - The ID of the table the round is starting on.
     *
     * @throws {InternalServerErrorException} If there's no player in the seat next to the dealer.
     */
    async startRound(tableId: TableId): Promise<void> {
        const table = await this.tableStateManagerService.getTableById(tableId);

        const startingSeat = determineStartingSeat(table.activeRound.dealerSeat, table.seatMap);

        await this.tableStateManagerService.updateRound(table.id, { activeSeat: startingSeat });

        const startingPlayerId = table.seatMap[startingSeat];

        // This should never occur
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
            type: 'roundChanged',
            roundStatus: 'deal',
            activeSeat: startingSeat,
            cards: [],
            toCall: this.blindManagerService.getBigBlind(),
            pot: this.blindManagerService.getBigBlind() + this.blindManagerService.getSmallBlind(),
        });

        await this.blindManagerService.forceBlinds(table);

        // Start the turn timer for the first player
        await this.turnTimeService.onStart({ tableId: table.id, startingPlayerId });
    }

    /**
     * @description Ends a round of poker.
     *
     * This method stops the final player's timer, handles calling the WinnerDeterminerService, and then determines
     * if the game should continue to another round.
     *
     * If the game is over (i.e. one player has all the chips) this method will update the table status to ended.
     * Otherwise, a new round is started.
     *
     * @param table - The ServerTableState.
     */
    async endRound(table: ServerTableState): Promise<void> {
        // Stop the final player's timer
        await this.turnTimeService.onEnd({
            tableId: table.id,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            finalPlayerId: table.seatMap[table.activeRound.activeSeat!]!,
        });

        table = await this.tableStateManagerService.getTableById(table.id);

        const updatedPlayerMap = table.playerMap;

        // Determine and emit winner of round and update player's stacks
        await this.winnerDeterminerService.determineWinner(table.id, updatedPlayerMap, table.activeRound);

        // Reset players to waiting at the end of the round
        for (const player of Object.values(table.playerMap)) {
            updatedPlayerMap[player.id] = {
                ...player,
                status: 'waiting',
            };
        }

        await this.tableStateManagerService.updateTable(table.id, { playerMap: updatedPlayerMap });

        // Re-fetch table with updated stacks
        table = await this.tableStateManagerService.getTableById(table.id);

        // Determine if the game can continue (i.e. two or more players still have chips)
        const playerStacks = Object.values(table.playerMap).map((player) => player.stack);
        const numPlayersWithNoChipsLeft = playerStacks.reduce((index, value) => (value === 0 ? index + 1 : index), 0);

        // Set active seat to null, signifying that its no longer anyone's turn until the next round starts.
        await this.tableStateManagerService.updateRound(table.id, { activeSeat: null });
        this.tableGatewayService.emitTableEvent(table.id, {
            type: 'roundChanged',
            activeSeat: null,
        });

        if (numPlayersWithNoChipsLeft === playerStacks.length - 1) {
            // If only one player has chips left in their stack, update the table status to 'ended'
            await this.tableStateManagerService.updateTable(table.id, { status: 'ended' });
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'tableStatusChanged',
                status: 'ended',
                startDate: undefined,
            });
        } else {
            // Because race conditions
            table = await this.tableStateManagerService.getTableById(table.id);
            /*
             * If the game can continue, set the next dealer/active seat, reset the round in state,
             * and call `startRound` to initiate the next round.
             */

            // Remove players who have no chips left from the game
            const outPlayers = Object.values(table.playerMap).filter((player) => player.stack === 0);
            for (const loser of Object.values(outPlayers)) {
                const player = table.playerMap[loser.id];
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const seatId = player.seatId!;

                player.status = 'out';
                player.seatId = null;

                table.seatMap[seatId] = undefined;

                this.tableGatewayService.emitTableEvent(table.id, {
                    type: 'playerLeft',
                    seatId,
                });
            }

            await this.tableStateManagerService.updateTable(table.id, table);

            table = await this.tableStateManagerService.getTableById(table.id);

            const nextDealerSeat = incrementSeat(table.activeRound.dealerSeat, table.seatMap);

            const roundChanges: Partial<Round> = {
                turnCount: 0,
                roundStatus: 'deal',
                pot: 0,
                toCall: 0,
                cards: [],
                dealerSeat: nextDealerSeat,
            };

            await this.tableStateManagerService.updateRound(table.id, roundChanges);

            await this.tableStateManagerService.updateAllPlayers(table.id, {
                status: 'waiting',
                roundCalled: 0,
                biddingCycleCalled: 0,
            });

            // We wait 10 seconds before starting the next round so that the results can be displayed
            setTimeout(async () => {
                this.tableGatewayService.emitTableEvent(table.id, {
                    type: 'roundChanged',
                    ...roundChanges,
                });

                await this.startRound(table.id);
            }, 10000);
        }
    }
}
