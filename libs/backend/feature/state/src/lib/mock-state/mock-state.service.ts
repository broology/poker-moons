import { Injectable } from '@nestjs/common';
import { GenericStateServiceImpl, ServerState } from '../generic-state-service.impl';
import { ServerTableState, TableId } from '@poker-moons/shared/type';

@Injectable()
export class MockStateService extends GenericStateServiceImpl {
    private state: ServerState = {};
    private id = 0;

    async getState(tableId: TableId): Promise<ServerTableState> {
        return this.state[tableId];
    }

    async create(serverTableState: ServerTableState): Promise<TableId> {
        const id: number = this.generateNewId();
        const tableId: TableId = `table_${id}`;
        this.state[tableId] = serverTableState;
        return tableId;
    }

    async delete(tableId: TableId): Promise<void> {
        delete this.state[tableId];
        return;
    }

    async update(tableId: TableId, updatedTable: Partial<ServerTableState>): Promise<void> {
        this.state[tableId] = { ...this.state[tableId], ...updatedTable };
        return;
    }

    private generateNewId(): number {
        this.id++;
        return this.id;
    }
}
