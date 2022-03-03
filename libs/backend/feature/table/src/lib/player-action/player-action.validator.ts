import type {
    AllInPlayerAction,
    CallPlayerAction,
    CheckPlayerAction,
    FoldPlayerAction,
    PerformPlayerActionRequest,
    PlayerAction,
    PlayerActionType,
    PlayerId,
    RaisePlayerAction,
    TableId,
} from '@poker-moons/shared/type';
import { PLAYER_PREFIX, TABLE_PREFIX } from '@poker-moons/shared/type';
import { playerActions } from '@poker-moons/shared/type';
import { IsEntityId } from '@poker-moons/shared/util';
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

class AllInPlayerActionValidator implements AllInPlayerAction {
    @Equals('all-in')
    type!: 'all-in';
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
                { name: 'all-in', value: AllInPlayerActionValidator },
            ],
        },
    })
    action!: PlayerAction;
}

export class PerformPlayerActionParamValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;

    @IsEntityId(PLAYER_PREFIX)
    playerId!: PlayerId;
}
