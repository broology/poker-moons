import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    CheckPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match } from 'ts-pattern';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class CheckActionHandlerService {
    /**
     * CheckActionHandlerService.check
     * @description Performs the check action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Checking is when a player passes the action to the next player while keeping their cards.
     * @param action
     * @type Either<PokerMoonsError, CheckPlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    check(action: Either<PokerMoonsError, CheckPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
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
        table: ServerTableState,
        player: Player,
        action: CheckPlayerAction,
    ): Either<PokerMoonsError, CheckPlayerAction> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            return match([table.activeRound.toCall === 0])
                .with([false], () => left(`Must bet a minimum of ${table.activeRound.toCall}.`))
                .otherwise(() => right(action));
        return playerTurn;
    }
}
