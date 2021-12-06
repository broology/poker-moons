import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    CallPlayerAction,
    CheckPlayerAction,
    FoldPlayerAction,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    RaisePlayerAction,
} from '@poker-moons/shared/type';

@Injectable()
export class PlayerActionService {
    perform(dto: PerformPlayerActionRequest): PerformPlayerActionResponse {
        switch (dto.action.type) {
            case 'fold':
                this.fold(dto.action);
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

    fold(action: FoldPlayerAction): PerformPlayerActionResponse {
        throw new NotImplementedException(action);
    }
    call(action: CallPlayerAction): PerformPlayerActionResponse {
        throw new NotImplementedException(action);
    }
    raise(action: RaisePlayerAction): PerformPlayerActionResponse {
        throw new NotImplementedException(action);
    }
    check(action: CheckPlayerAction): PerformPlayerActionResponse {
        throw new NotImplementedException(action);
    }
}
