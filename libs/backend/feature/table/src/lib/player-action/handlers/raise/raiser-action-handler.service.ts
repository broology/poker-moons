import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    RaisePlayerAction,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match, __ } from 'ts-pattern';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class RaiseActionHandlerService {
    /**
     * RaiseActionHandlerService.raise
     * @description Performs the raise action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Raising means increasing the size of an existing bet in the current round.
     * @param action
     * @type Either<PokerMoonsError, RaisePlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    raise(action: Either<PokerMoonsError, RaisePlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }

    /**
     * RaiseActionHandlerService.canRaise
     * @description Determines if a player is able to raise given the current game state.
     * A raise can happen at any time during a betting round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type Player
     * @param action
     * @type RaisePlayerAction
     * @returns Either<PokerMoonsError, RaisePlayerAction>
     */
    canRaise(
        table: ServerTableState,
        player: Player,
        action: RaisePlayerAction,
    ): Either<PokerMoonsError, RaisePlayerAction> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            return match([player.stack > table.activeRound.toCall, player.stack > action.amount])
                .with([false, __.boolean], () => left(`Minimum to raise is ${table.activeRound.toCall}.`))
                .with([__.boolean, false], () => left(`Player does not have ${action.amount} in their stack.`))
                .otherwise(() => right(action));
        return playerTurn;
    }
}
