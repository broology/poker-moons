import { CreateTableRequest, IsEntityId, TABLE_PREFIX, TableId } from '@poker-moons/shared/type';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTableRequestValidator implements CreateTableRequest {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class GetTableRequestValidator {
    @IsEntityId(TABLE_PREFIX)
    id!: TableId;
}
