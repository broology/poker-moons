import { TableId, TABLE_PREFIX } from '@poker-moons/shared/type';
import { IsEntityId } from '@poker-moons/shared/util';

export class TableIdValidator {
    @IsEntityId(TABLE_PREFIX)
    tableId!: TableId;
}
