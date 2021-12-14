import { Injectable } from '@nestjs/common';
import { ServerTableState, TableId } from '@poker-moons/shared/type';

@Injectable()
export abstract class GenericStateService {
    abstract getState(tableId: TableId): Promise<ServerTableState>;

    abstract create(serverTableState: ServerTableState): Promise<TableId>;

    abstract delete(tableId: TableId): Promise<void>;

    abstract update(tableId: TableId, updatedTable: Partial<ServerTableState>): Promise<void>;
}

export interface ServerState {
    [key: TableId]: ServerTableState;
}
