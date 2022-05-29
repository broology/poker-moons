import { JoinTableRequest, PlayerId, PLAYER_PREFIX, TableId, TABLE_PREFIX } from '@poker-moons/shared/type';
import { IsEntityId } from '@poker-moons/shared/util';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinTableRequestValidator implements JoinTableRequest {
    @IsString()
    @IsNotEmpty()
    username!: string;
}

export class JoinTableParamValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;
}

export class LeaveTableRequestValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;

    @IsEntityId(PLAYER_PREFIX)
    playerId!: PlayerId;
}

export class GetPlayerCardsRequestValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;

    @IsEntityId(PLAYER_PREFIX)
    playerId!: PlayerId;
}

export class ToggleReadyStatusRequestValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;

    @IsEntityId(PLAYER_PREFIX)
    playerId!: PlayerId;
}
