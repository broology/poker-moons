import { Table } from '../table';

export type CreateTableRequest = Pick<Table, 'name'>;
export type CreateTableResponse = Table;
