import { Table } from '../table';

/**
 * POST /table
 */
export type CreateTableRequest = Pick<Table, 'name'>;
export type CreateTableResponse = Table;

/**
 * GET /table/id
 */
export type GetTableResponse = Table;

/**
 * PUT /table/id
 */
export type UpdateTableRequest = Partial<Pick<Table, 'name'>>;
export type UpdateTableResponse = Table;
