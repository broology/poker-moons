import { JoinTableRequest, PLAYER_PREFIX, PlayerId } from '@poker-moons/shared/type';
import { TABLE_PREFIX, TableId } from '@poker-moons/shared/type';
import { IsEntityId } from '../../../../../../shared/type/src/lib/id.validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinTableRequestValidator implements JoinTableRequest {
    @IsString()
    @IsNotEmpty()
    username!: string;
}

export class LeaveTableRequestValidator {
  @IsEntityId(TABLE_PREFIX)
  tableId!: TableId;

  @IsEntityId(PLAYER_PREFIX)
  playerId!: PlayerId
}

export class GetPlayerCardsRequestValidator {
  @IsEntityId(TABLE_PREFIX)
  tableId!: TableId;

  @IsEntityId(PLAYER_PREFIX)
  playerId!: PlayerId
}
