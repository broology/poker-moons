import { CreateTableRequest, TABLE_PREFIX, TableId, UpdateTableRequest } from '@poker-moons/shared/type';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsEntityId } from '@poker-moons/shared/util';

export class CreateTableRequestValidator implements CreateTableRequest {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class TableIdValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;
}

export class UpdateTableRequestValidator implements UpdateTableRequest {
    @IsOptional()
    @IsString()
    name!: string;
}
