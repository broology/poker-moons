import { Type } from 'class-transformer';
import { PerformPlayerActionRequest } from '@poker-moons/shared/type';
import { IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PlayerAction } from 'libs/shared/type/src/lib/player-action';

export class PerformPlayerActionRequestValidator implements PerformPlayerActionRequest {
    @IsDefined()
    @ValidateNested()
    @Type(() => BaseTableActionValidator, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                { name: 'bid', value: BidTableActionValidator },
                { name: 'hit', value: HitTableActionValidator },
                { name: 'stand', value: StandTableActionValidator },
                { name: 'double', value: DoubleTableActionValidator },
                { name: 'join', value: JoinTableActionValidator },
                { name: 'leave', value: LeaveTableActionValidator },
            ],
        },
    })
    action!: PlayerAction;
}
