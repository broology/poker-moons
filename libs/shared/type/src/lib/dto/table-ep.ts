import { Table } from '../table';

export const TABLE_PREFIX = 'table' as const;

/**
 * POST /table
 */
export type CreateTableRequest = Pick<Table, 'name'>;
export type CreateTableResponse = Table;

/**
 * GET /table/id
 */
export type GetTableResponse = Table;
