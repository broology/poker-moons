import { Table, TableId } from '../table';
import { ClientTableState } from '../state';

/**
 * POST /table
 */
export type CreateTableRequest = Pick<Table, 'name'>;
export type CreateTableResponse = TableId;

/**
 * GET /table/id
 */
export type GetTableResponse = Pick<Table, 'id' | 'name'>;

/**
 * PUT /table/id
 */
export type UpdateTableRequest = Partial<Pick<Table, 'name'>>;
export type UpdateTableResponse = ClientTableState;
