import { Type } from 'class-transformer';
import { PerformPlayerActionRequest } from '@poker-moons/shared/type';
import {
    Equals,
    IsDefined,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsPositive,
    isPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { PlayerAction, playerActions, PlayerActionType } from 'libs/shared/type/src/lib/player-action';

class BasePlayerActionValidator {
    @IsIn([...playerActions])
    type!: PlayerActionType;
}

class FoldPlayerActionValidator {
    @Equals('fold')
    type!: 'fold';
}

class CallPlayerActionValidator {
    @Equals('call')
    type!: 'call';
}

class RaisePlayerActionValidator {
    @Equals('raise')
    type!: 'raise';
    @IsInt()
    @IsPositive()
    amount!: number;
}

class CheckPlayerActionValidator {
    @Equals('check')
    type!: 'check';
}

class GetHandPlayerActionValidator {
    @Equals('get-hand')
    type!: 'get-hand';
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
                { name: 'get-hand', value: GetHandPlayerActionValidator },
            ],
        },
    })
    action!: PlayerAction;
}
