import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    CallPlayerAction,
    CheckPlayerAction,
    ClientTableState,
    FoldPlayerAction,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PlayerAction,
    PokerMoonsError,
    RaisePlayerAction,
    Table,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { match } from 'ts-pattern';

@Injectable()
export class PlayerActionService {
    perform(dto: PerformPlayerActionRequest): PerformPlayerActionResponse {
        //get state and table

        switch (dto.action.type) {
            case 'fold':
                pipe(this.canFold(dto.action), this.fold);
                break;
            case 'call':
                pipe(this.canCall(dto.action), this.call);
                break;
            case 'raise':
                pipe(this.canRaise(dto.action), this.raise);
                break;
            case 'check':
                pipe(this.canCheck(dto.action), this.check);
                break;
        }
    }

    /**
     * PlayerActionService.fold
     * @description Performs the fold action and returns an action response if the state is valid, else it throws and error describing the invalid state.
     * @param action
     * @type Either<PokerMoonsError, FoldPlayerAction>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    fold(action: Either<PokerMoonsError, FoldPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }
    call(action: Either<PokerMoonsError, CallPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }
    raise(action: Either<PokerMoonsError, RaisePlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }
    check(action: Either<PokerMoonsError, CheckPlayerAction>): PerformPlayerActionResponse {
        if (isRight(action)) throw new NotImplementedException(action.right);
        else throw new Error(action.left);
    }

    validPlayer(
        table: Table,
        clientState: ClientTableState,
        action: PlayerAction,
    ): Either<PokerMoonsError, PlayerAction> {
        if (clientState.playerId)
            if (table.activeRound.activeSeat) return right(action);
            else return left('Player not in game');
        else return left('Player not in game');
    }

    /**
     * PlayerActionService.canFold
     * @description Determines if a player is able to fold given the current game state.
     * A fold can happen at any point in the play when it is the players turn to act.
     * @param table
     * @type Table
     * @param clientState
     * @type ClientTableState
     * @param action
     * @type FoldPlayerAction
     * @returns Either<PokerMoonsError, FoldPlayerAction>
     */
    canFold(
        table: Table,
        clientState: ClientTableState,
        action: FoldPlayerAction,
    ): Either<PokerMoonsError, FoldPlayerAction> {
        const player = this.validPlayer(table, clientState, action);
        if (isRight(player))
            return match([
                clientState.playerId,
                table.activeRound.activeSeat,
                table.activeRound.activeSeat
                    ? table.seatMap[table.activeRound.activeSeat]
                    : table.activeRound.activeSeat,
            ])
                .with([], () => left('Cannot perform action.'))
                .otherwise(() => right(action));
        return player;
    }
    canCall(
        table: Table,
        clientState: ClientTableState,
        action: CallPlayerAction,
    ): Either<PokerMoonsError, CallPlayerAction> {
        return match([])
            .with([], () => left('Cannot perform action.'))
            .otherwise(() => right(action));
    }
    canRaise(
        table: Table,
        clientState: ClientTableState,
        action: RaisePlayerAction,
    ): Either<PokerMoonsError, RaisePlayerAction> {
        return match([])
            .with([], () => left('Cannot perform action.'))
            .otherwise(() => right(action));
    }
    canCheck(
        table: Table,
        clientState: ClientTableState,
        action: CheckPlayerAction,
    ): Either<PokerMoonsError, CheckPlayerAction> {
        return match([])
            .with([], () => left('Cannot perform action.'))
            .otherwise(() => right(action));
    }
}
