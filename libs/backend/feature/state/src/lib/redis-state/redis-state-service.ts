import { Injectable, NotImplementedException } from '@nestjs/common';
import { GenericStateServiceImpl } from '../generic-state-service.impl';
import { ServerTableState, TableId } from '@poker-moons/shared/type';

@Injectable()
export class RedisStateService implements GenericStateServiceImpl {
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
