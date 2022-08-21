import { Table, TableId } from '../table';

/**
 * @description POST /table.
 */
export type CreateTableRequest = void;
export type CreateTableResponse = TableId;

/**
 * @description GET /table/id.
 */
export type GetTableResponse = Pick<Table, 'id'>;
