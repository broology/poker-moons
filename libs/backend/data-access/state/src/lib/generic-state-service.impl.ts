import { Injectable } from '@nestjs/common';
import { ServerTableState, TableId } from '@poker-moons/shared/type';

@Injectable()
export abstract class GenericStateServiceImpl {
    /**
     * Get the current state object of a table.
     * @param tableId The id of the table to get the state of
     * @return A ServerTableState
     */
    abstract getState(tableId: TableId): Promise<ServerTableState>;

    /**
     * Create a new ServerTableState object in the state storage
     * @param serverTableState The ServerTableState to add to the state storage
     * @return The newly generated id of the newly created table state
     */
    abstract create(serverTableState: ServerTableState): Promise<TableId>;

    /**
     * Delete a ServerTableState object from the state storage
     * @param tableId The id of the ServerTableState to delete
     */
    abstract delete(tableId: TableId): Promise<void>;

    /**
     * Update a ServerTableState in the state storage
     * @param tableId The id of the ServerTableState object to update
     * @param updatedTable A partial containing the updated values of the ServerTableState to update
     */
    abstract update(tableId: TableId, updatedTable: Partial<ServerTableState>): Promise<void>;
}

export interface ServerState {
    [key: TableId]: ServerTableState;
}
