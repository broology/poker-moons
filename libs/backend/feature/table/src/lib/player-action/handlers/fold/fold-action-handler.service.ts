import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    FoldPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, right } from 'fp-ts/lib/Either';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class FoldActionHandlerService {
    /**
     * FoldActionHandlerService.fold
     * @description Performs the fold action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Folding means the player is out for the current round. The player no longer will have any claim to the pot for the current round and is not required to put any money into the pot for the remainder of the current round.
     * @param action
     * @type Either<PokerMoonsError, FoldPlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    fold(action: Either<PokerMoonsError, FoldPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
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
    ): Either<PokerMoonsError, FoldPlayerAction> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn)) return right(action);

        return playerTurn;
    }
}
