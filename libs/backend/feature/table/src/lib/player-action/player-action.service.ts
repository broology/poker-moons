import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    CallPlayerAction,
    CheckPlayerAction,
    ClientTableState,
    FoldPlayerAction,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PokerMoonsError,
    RaisePlayerAction,
    Table,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match } from 'ts-pattern';

@Injectable()
export class PlayerActionService {
    perform(dto: PerformPlayerActionRequest): PerformPlayerActionResponse {
        switch (dto.action.type) {
            case 'fold':
                this.fold(this.canFold());
                break;
            case 'call':
                this.call(dto.action);
                break;
            case 'raise':
                this.raise(dto.action);
                break;
            case 'check':
                this.check(dto.action);
                break;
        }

        throw new NotImplementedException();
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

    canFold(
        table: Table,
        clientState: ClientTableState,
        action: FoldPlayerAction,
    ): Either<PokerMoonsError, FoldPlayerAction> {
        return match([])
            .with([], () => left('Cannot perform action.'))
            .otherwise(() => right(action));
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
