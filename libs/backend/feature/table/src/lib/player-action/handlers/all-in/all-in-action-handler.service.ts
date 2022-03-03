import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    AllInPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, right } from 'fp-ts/lib/Either';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class AllInActionHandlerService {
    /**
     * AllInActionHandlerService.allIn
     * @description Performs the all-in action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * All-in means increasing the size of an existing bet in the current round to include all remaining chips in the player's stack.
     * @param action
     * @type Either<PokerMoonsError, AllInPlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    allIn(action: Either<PokerMoonsError, AllInPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }

    /**
     * AllInActionHandlerService.canAllIn
     * @description Determines if a player is able to go all-in given the current game state.
     * All-in can happen at any time during a betting round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type Player
     * @param action
     * @type AllInPlayerAction
     * @returns Either<PokerMoonsError, RaisePlayerAction>
     */
    canAllIn(
        table: ServerTableState,
        player: Player,
        action: AllInPlayerAction,
    ): Either<PokerMoonsError, AllInPlayerAction> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn)) return right(action);

        return playerTurn;
    }
}
