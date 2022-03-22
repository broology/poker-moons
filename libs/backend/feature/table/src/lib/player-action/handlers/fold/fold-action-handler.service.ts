import { Injectable } from '@nestjs/common';
import {
    FoldPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
    TableId,
} from '@poker-moons/shared/type';
import { Either, isRight, right } from 'fp-ts/lib/Either';
import { validatePlayerTurn } from '../util/validate-player-turn';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';

@Injectable()
export class FoldActionHandlerService {
    private logger = new CustomLoggerService(FoldActionHandlerService.name);

    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

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
        action: Either<PokerMoonsError, { table: ServerTableState & { id: TableId }; player: Player }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, { status: 'folded' });

            table.playerMap[player.id] = { ...player, status: 'folded' };
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
        table: ServerTableState & { id: TableId },
        player: Player,
        action: FoldPlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState & { id: TableId }; player: Player }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn)) return right({ table, player, action });

        return playerTurn;
    }
}
