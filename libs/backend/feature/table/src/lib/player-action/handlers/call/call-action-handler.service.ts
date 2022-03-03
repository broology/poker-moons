import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    CallPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match } from 'ts-pattern';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class CallActionHandlerService {
    /**
     * CallActionHandlerService.call
     * @description Performs the call action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Calling means matching a bet or raise. To call is to bet the minimum amount to stay active in the current round.
     * @param action
     * @type Either<PokerMoonsError, CallPlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    call(action: Either<PokerMoonsError, CallPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }

    /**
     * CallActionHandlerService.canCall
     * @description Determines if a player is able to call given the current game state.
     * A call can happen at any point during a betting round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type Player
     * @param action
     * @type CallPlayerAction
     * @returns Either<PokerMoonsError, CallPlayerAction>
     */
    canCall(
        table: ServerTableState,
        player: Player,
        action: CallPlayerAction,
    ): Either<PokerMoonsError, CallPlayerAction> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            return match([player.stack >= table.activeRound.toCall])
                .with([false], () => left(`Minimum to call is ${table.activeRound.toCall}.`))
                .otherwise(() => right(action));

        return playerTurn;
    }
}
