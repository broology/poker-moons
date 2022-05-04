import { JoinTableRequest, PLAYER_PREFIX, PlayerId, TABLE_PREFIX, TableId } from '@poker-moons/shared/type';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEntityId } from '@poker-moons/shared/util';

export class JoinTableRequestValidator implements JoinTableRequest {
    @IsString()
    @IsNotEmpty()
    username!: string;
}

export class JoinTableParamValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;
}

//TODO: Maybe just make one validator class for all put/get to extend
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

export class ToggleReadyStatusTableRequestValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;

    @IsEntityId(PLAYER_PREFIX)
    playerId!: PlayerId;
}