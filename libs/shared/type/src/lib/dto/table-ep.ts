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
