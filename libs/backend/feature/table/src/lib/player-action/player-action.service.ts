import { Injectable, NotImplementedException } from '@nestjs/common';
import { mockPublicPlayer, mockServerTable } from '@poker-moons/shared/testing';
import {
    CallPlayerAction,
    CheckPlayerAction,
    FoldPlayerAction,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PlayerAction,
    PokerMoonsError,
    PublicPlayer,
    RaisePlayerAction,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { match } from 'ts-pattern';

@Injectable()
export class PlayerActionService {
    perform(dto: PerformPlayerActionRequest): PerformPlayerActionResponse {
        const player: PublicPlayer = mockPublicPlayer();
        const table: ServerTableState = mockServerTable();

        switch (dto.action.type) {
            case 'fold':
                pipe(this.canFold(table, player, dto.action), this.fold);
                break;
            case 'call':
                pipe(this.canCall(table, player, dto.action), this.call);
                break;
            case 'raise':
                pipe(this.canRaise(table, player, dto.action), this.raise);
                break;
            case 'check':
                pipe(this.canCheck(table, player, dto.action), this.check);
                break;
        }
    }

    /**
     * PlayerActionService.fold
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
     * PlayerActionService.call
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
     * PlayerActionService.raise
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
     * PlayerActionService.check
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

    validPlayer(
        table: ServerTableState,
        player: PublicPlayer,
        action: PlayerAction,
    ): Either<PokerMoonsError, PlayerAction> {
        if (player.id)
            if (table.activeRound.activeSeat) return right(action);
            else return left('PublicPlayer not in game');
        else return left('PublicPlayer not in game');
    }

    /**
     * PlayerActionService.canFold
     * @description Determines if a player is able to fold given the current game state.
     * A fold can happen at any point in the play when it is the players turn to act.
     * @param table
     * @type ServerTableState
     * @param player
     * @type PublicPlayer
     * @param action
     * @type FoldPlayerAction
     * @returns Either<PokerMoonsError, FoldPlayerAction>
     */
    canFold(
        table: ServerTableState,
        player: PublicPlayer,
        action: FoldPlayerAction,
    ): Either<PokerMoonsError, FoldPlayerAction> {
        if (isRight(this.playersTurn(table, player, action))) return right(action);

        return left('Not players turn.');
    }

    /**
     * PlayerActionService.canCall
     * @description Determines if a player is able to call given the current game state.
     * A call can happen at any point during a betting round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type PublicPlayer
     * @param action
     * @type CallPlayerAction
     * @returns Either<PokerMoonsError, CallPlayerAction>
     */
    canCall(
        table: ServerTableState,
        player: PublicPlayer,
        action: CallPlayerAction,
    ): Either<PokerMoonsError, CallPlayerAction> {
        if (isRight(this.playersTurn(table, player, action)))
            return match([player.stack >= table.activeRound.toCall])
                .with([false], () => left(`Minimum to call is ${table.activeRound.toCall}.`))
                .otherwise(() => right(action));

        return left('Not players turn.');
    }

    /**
     * PlayerActionService.canRaise
     * @description Determines if a player is able to raise given the current game state.
     * A raise can happen at any time during a betting round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type PublicPlayer
     * @param action
     * @type RaisePlayerAction
     * @returns Either<PokerMoonsError, RaisePlayerAction>
     */
    canRaise(
        table: ServerTableState,
        player: PublicPlayer,
        action: RaisePlayerAction,
    ): Either<PokerMoonsError, RaisePlayerAction> {
        if (isRight(this.playersTurn(table, player, action)))
            return match([player.stack > table.activeRound.toCall])
                .with([false], () => left(`Minimum to raise is ${table.activeRound.toCall}.`))
                .otherwise(() => right(action));

        return left('Not players turn.');
    }

    /**
     * PlayerActionService.canCheck
     * @description Determines if a player is able to check given the current game state.
     * A check can only happen when there is no bet during current round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type PublicPlayer
     * @param action
     * @type CheckPlayerAction
     * @returns Either<PokerMoonsError, CheckPlayerAction>
     */
    canCheck(
        table: ServerTableState,
        player: PublicPlayer,
        action: CheckPlayerAction,
    ): Either<PokerMoonsError, CheckPlayerAction> {
        return match([])
            .with([], () => left('Cannot perform action.'))
            .otherwise(() => right(action));
    }
}
