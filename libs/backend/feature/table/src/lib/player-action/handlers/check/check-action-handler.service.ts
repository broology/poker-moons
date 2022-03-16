import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    CheckPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PlayerId,
    PokerMoonsError,
    ServerTableState,
    TableId,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match } from 'ts-pattern';
import { WinnerDeterminerService } from '../../../round/winner-determiner/winner-determiner.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { hasEveryoneTakenTurn, incrementSeat, isRoundComplete } from '../util/round.util';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class CheckActionHandlerService {
    private logger = new CustomLoggerService(CheckActionHandlerService.name);

    constructor(
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly winnerDeterminerService: WinnerDeterminerService,
    ) {}

    /**
     * CheckActionHandlerService.check
     * @description Performs the check action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Checking is when a player passes the action to the next player while keeping their cards.
     * @param action
     * @type Either<PokerMoonsError, { table: ServerTableState, player: Player }>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    async check(
        action: Either<PokerMoonsError, { table: ServerTableState & { id: TableId }; player: Player }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, { status: 'checked' });

            table.playerMap[player.id] = { ...player, status: 'checked' };

            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            if (isRoundComplete(table.activeRound.roundStatus, playerStatuses)) {
                // Determine and emit winner
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
            } else {
                if (!table.activeRound.activeSeat) {
                    throw new Error('Something went wrong, no active seat is set!');
                }

                // Increment the turn count and active seat
                await this.tableStateManagerService.updateRound(table.id, {
                    turnCount: table.activeRound.turnCount + 1,
                    activeSeat: incrementSeat(table.activeRound.activeSeat),
                });

                // Reset every active player to 'waiting' if another iteration of actions is about to begin
                if (hasEveryoneTakenTurn(playerStatuses)) {
                    const updatedPlayerMap: Record<PlayerId, Player> = {};

                    for (const player of Object.values(table.playerMap)) {
                        updatedPlayerMap[player.id] = {
                            ...player,
                            status: player.status === 'folded' ? 'folded' : 'waiting',
                        };
                    }

                    await this.tableStateManagerService.updateTable(table.id, { playerMap: updatedPlayerMap });
                }
            }
        } else {
            this.logger.error(action.left);
            throw new Error(action.left);
        }
    }

    /**
     * CheckActionHandlerService.canCheck
     * @description Determines if a player is able to check given the current game state.
     * A check can only happen when there is no bet during current round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type Player
     * @param action
     * @type CheckPlayerAction
     * @returns Either<PokerMoonsError, CheckPlayerAction>
     */
    canCheck(
        table: ServerTableState & { id: TableId },
        player: Player,
        action: CheckPlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState & { id: TableId }; player: Player }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            return match([table.activeRound.toCall === 0])
                .with([false], () => left(`Must bet a minimum of ${table.activeRound.toCall}.`))
                .otherwise(() => right({ table, player, action }));
        return playerTurn;
    }
}
