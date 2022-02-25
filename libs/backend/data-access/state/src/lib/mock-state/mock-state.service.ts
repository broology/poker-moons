import { Injectable } from '@nestjs/common';
import { GenericStateServiceImpl, ServerState } from '../generic-state-service.impl';
import { ServerTableState, TableId } from '@poker-moons/shared/type';
import { CustomLoggerService } from '@poker-moons/backend/utility';

/**
 * The mock state service. Stores the state in memory, in a mock way to as how redis would store. This class can be used
 * in the exact same way as the "RedisStateService" would be, allowing for easy flip between using the production state,
 * and a mock one for testing.
 */
@Injectable()
export class MockStateService implements GenericStateServiceImpl {
    private logger = new CustomLoggerService(MockStateService.name);
    private state: ServerState = {};
    private id = 0;

    async getState(tableId: TableId): Promise<ServerTableState> {
        this.logger.debug('Got table with id: ' + tableId);
        return this.state[tableId];
    }

    async create(serverTableState: ServerTableState): Promise<TableId> {
        const id: number = this.generateNewId();
        const tableId: TableId = `table_${id}`;
        this.state[tableId] = serverTableState;
        this.logger.log('Created new table with id: ' + tableId);
        this.logger.debug('New table: ' + JSON.stringify(serverTableState, null, 4));
        return tableId;
    }

    async delete(tableId: TableId): Promise<void> {
        delete this.state[tableId];
        this.logger.log('Deleted table:' + tableId);
        return;
    }

    async update(tableId: TableId, updatedTable: Partial<ServerTableState>): Promise<void> {
        this.state[tableId] = { ...this.state[tableId], ...updatedTable };
        this.logger.log('Updated table: ' + tableId);
        this.logger.debug('Updated table:' + JSON.stringify({ ...this.state[tableId], ...updatedTable }, null, 4));
        return;
    }

    private generateNewId(): number {
        this.id++;
        return this.id;
    }
}
