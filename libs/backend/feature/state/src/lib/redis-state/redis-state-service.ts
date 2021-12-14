import { Injectable, NotImplementedException } from '@nestjs/common';
import { GenericStateService } from '../GenericStateService';
import { ServerTableState, TableId } from '@poker-moons/shared/type';

Injectable();

export class RedisStateService extends GenericStateService {
    create(serverTableState: ServerTableState): Promise<TableId> {
        throw new NotImplementedException();
    }

    delete(tableId: TableId): Promise<void> {
        throw new NotImplementedException();
    }

    getState(tableId: TableId): Promise<ServerTableState> {
        throw new NotImplementedException();
    }

    update(tableId: TableId, updatedTable: Partial<ServerTableState>): Promise<void> {
        throw new NotImplementedException();
    }
}
