import { CreateTableRequest, TABLE_PREFIX, TableId } from '@poker-moons/shared/type';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEntityId } from '../../../../../../shared/type/src/lib/id.validator';

export class CreateTableRequestValidator implements CreateTableRequest {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class GetTableRequestValidator {
    @IsEntityId(TABLE_PREFIX)
    id!: TableId;
}
