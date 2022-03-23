import { Injectable } from '@nestjs/common';
import { Player, PlayerId, PlayerStatus, SeatId, ServerTableState } from '@poker-moons/shared/type';
import { hasEveryoneTakenTurn, incrementRoundStatus, incrementSeat } from '../../shared/util/round.util';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { DeckManagerService } from '../deck-manager/deck-manager.service';
import { WinnerDeterminerService } from '../winner-determiner/winner-determiner.service';

@Injectable()
export class RoundManagerService {
    constructor(
        private readonly deckManagerService: DeckManagerService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly winnerDeterminerService: WinnerDeterminerService,
    ) {}

    /**
     * Initiates the next turn during a round of poker by incrementing the turn count
     * and active seat. Also handles resetting player statuses to 'waiting' once everyone has
     * taken a turn and drawing a new card for the next part of the round.
     *
     * TODO: Should update the turn timer to the next player utilizing the TurnTimerService
     * @jordems developed.
     *
     * Should be called in the player action handlers at the end of every turn.
     *
     * @param table - the ServerTableState and table ID
     * @param status - the new status of the player that just took their turn
     * @param playerStatuses - the status of each player in the round
     */
    async startNextTurn(table: ServerTableState, newActiveSeat: SeatId, playerStatuses: PlayerStatus[]): Promise<void> {
        // Increment the turn count and active seat
        await this.tableStateManagerService.updateRound(table.id, {
            turnCount: table.activeRound.turnCount + 1,
            activeSeat: newActiveSeat,
        });

        /*
         * If everyone has taken their turn, set every active player back to 'waiting',
         * draw a new card for the table, and update the round status
         */
        if (hasEveryoneTakenTurn(playerStatuses)) {
            const updatedPlayerMap: Record<PlayerId, Player> = {};

            for (const player of Object.values(table.playerMap)) {
                updatedPlayerMap[player.id] = {
                    ...player,
                    status: player.status === 'folded' ? 'folded' : 'waiting',
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

            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'roundStatusChanged',
                status: incrementRoundStatus(table.activeRound.roundStatus),
                cards: table.activeRound.cards,
            });
        }
    }

    /**
     * Starts a new round of poker by building a new deck and dealing out
     * cards to the players.
     *
     * @param table - the ServerTableState and table ID
     */
    async startRound(table: ServerTableState): Promise<void> {
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
            cards: [],
        });
    }

    /**
     * Ends a round of poker by calling the WinnerDeterminerService and resetting
     * the round in the server state. Also handles incrementing the dealer seat
     * for the next round.
     *
     * If the game is over (i.e. one player has all the chips) this method will... (TODO)
     * Otherwise, a new round is started.
     *
     * @param table - the ServerTableState and table ID
     */
    async endRound(table: ServerTableState): Promise<void> {
        // Determine and emit winner of round and update player's stacks
        await this.winnerDeterminerService.determineWinner(table.id, table.playerMap, table.activeRound);

        // Reset the round and increment dealer seat
        const newDealerSeat = incrementSeat(table.activeRound.dealerSeat);

        await this.tableStateManagerService.updateRound(table.id, {
            turnCount: 0,
            roundStatus: 'deal',
            pot: 0,
            toCall: 0,
            cards: [],
            dealerSeat: newDealerSeat,
            activeSeat: incrementSeat(newDealerSeat),
        });

        // Determine if the game can continue (i.e. two or more players still have chips)
        const playerStacks = Object.values(table.playerMap).map((player) => player.stack);
        const numPlayersWithNoChipsLeft = playerStacks.reduce((index, value) => (value === 0 ? index + 1 : index), 0);

        if (numPlayersWithNoChipsLeft === playerStacks.length - 1) {
            // TODO: Update table status to ended after https://github.com/broology/poker-moons/pull/139 is merged in
        } else {
            // If the game can continue, start a new round
            await this.startRound(table);
        }
    }
}
