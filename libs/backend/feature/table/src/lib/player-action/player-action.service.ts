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
import { match } from 'ts-pattern';

@Injectable()
export class PlayerActionService {
    perform(dto: PerformPlayerActionRequest): PerformPlayerActionResponse {
        //get state and table

        switch (dto.action.type) {
            case 'fold':
                this.fold(this.canFold(dto.action));
                break;
            case 'call':
                this.call(this.canCall(dto.action));
                break;
            case 'raise':
                this.raise(this.canRaise(dto.action));
                break;
            case 'check':
                this.check(this.canCheck(dto.action));
                break;
        }
    }

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
