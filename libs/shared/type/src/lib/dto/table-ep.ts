import { Table, TableId } from '../table';

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
