import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    FoldPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, right } from 'fp-ts/lib/Either';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { incrementSeat, isRoundComplete } from '../../../shared/util/round.util';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class FoldActionHandlerService {
    private logger = new CustomLoggerService(FoldActionHandlerService.name);

    constructor(
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly roundManagerService: RoundManagerService,
    ) {}

    /**
     * FoldActionHandlerService.fold
     * @description Performs the fold action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Folding means the player is out for the current round. The player no longer will have any claim to the pot for the current round and is not required to put any money into the pot for the remainder of the current round.
     * @param action
     * @type Either<PokerMoonsError, FoldPlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    async fold(
        action: Either<PokerMoonsError, { table: ServerTableState; player: Player }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            if (table.activeRound.activeSeat === null) {
                throw new Error('Something went wrong, no active seat is set!');
            }

            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, { status: 'folded' });

            // Emit the PlayerTurnEvent to the frontend
            const newActiveSeat = incrementSeat(table.activeRound.activeSeat, table.seatMap);
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'folded',
                newActiveSeatId: newActiveSeat,
                bidAmount: 0,
            });

            table.playerMap[player.id] = { ...player, status: 'folded' };
            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            // Determine if the round is complete, if it isn't, start the next turn
            if (isRoundComplete(table.activeRound.roundStatus, playerStatuses, table)) {
                await this.roundManagerService.endRound(table);
            } else {
                await this.roundManagerService.startNextTurn(table, newActiveSeat, playerStatuses);
            }
        } else {
            this.logger.error(action.left);
            throw new Error(action.left);
        }
    }

    /**
     * FoldActionHandlerService.canFold
     * @description Determines if a player is able to fold given the current game state.
     * A fold can happen at any point in the play when it is the players turn to act.
     * @param table
     * @type ServerTableState
     * @param player
     * @type Player
     * @param action
     * @type FoldPlayerAction
     * @returns Either<PokerMoonsError, FoldPlayerAction>
     */
    canFold(
        table: ServerTableState,
        player: Player,
        action: FoldPlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState; player: Player }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn)) return right({ table, player, action });

        return playerTurn;
    }
}
