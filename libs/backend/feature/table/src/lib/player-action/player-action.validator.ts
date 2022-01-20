import type {
    CallPlayerAction,
    CheckPlayerAction,
    FoldPlayerAction,
    PerformPlayerActionRequest,
    PlayerAction,
    PlayerActionType,
    RaisePlayerAction,
} from '@poker-moons/shared/type';
import { playerActions } from '@poker-moons/shared/type';
import { Type } from 'class-transformer';
import { Equals, IsDefined, IsIn, IsInt, IsPositive, ValidateNested } from 'class-validator';

class BasePlayerActionValidator {
    @IsIn([...playerActions])
    type!: PlayerActionType;
}

class FoldPlayerActionValidator implements FoldPlayerAction {
    @Equals('fold')
    type!: 'fold';
}

class CallPlayerActionValidator implements CallPlayerAction {
    @Equals('call')
    type!: 'call';
}

class RaisePlayerActionValidator implements RaisePlayerAction {
    @Equals('raise')
    type!: 'raise';
    @IsInt()
    @IsPositive()
    amount!: number;
}

class CheckPlayerActionValidator implements CheckPlayerAction {
    @Equals('check')
    type!: 'check';
}

export class PerformPlayerActionRequestValidator implements PerformPlayerActionRequest {
    @IsDefined()
    @ValidateNested()
    @Type(() => BasePlayerActionValidator, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                { name: 'fold', value: FoldPlayerActionValidator },
                { name: 'call', value: CallPlayerActionValidator },
                { name: 'raise', value: RaisePlayerActionValidator },
                { name: 'check', value: CheckPlayerActionValidator },
            ],
        },
    })
    action!: PlayerAction;
}
