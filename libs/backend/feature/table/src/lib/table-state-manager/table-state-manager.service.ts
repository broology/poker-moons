import { Inject, Injectable } from '@nestjs/common';
import { ServerTableState, TableId } from '@poker-moons/shared/type';
import { GenericStateServiceImpl, STATE_SERVICE } from '@poker-moons/backend-data-access-state';

const initialTableState: ServerTableState = {
    name: '',
    seatMap: {
        0: undefined,
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
    },
    roundCount: 0,
    activeRound: {
        pot: 0,
        toCall: 0,
        turnCount: 0,
        roundStatus: 'deal',
        activeSeat: null,
        dealerSeat: 0,
        smallBlind: 0,
        cards: [],
    },
    deck: [],
    playerMap: {},
};

@Injectable()
export class TableStateManagerService {
    constructor(@Inject(STATE_SERVICE) private readonly stateService: GenericStateServiceImpl) {}

    /**
     * Create a new table (a new game) from scratch. Creates a "default" table, with nothing in
     * it and will require updates as players get added, etc.
     * @param newTableName The name of the table/game.
     * @returns The TableId of the new table, as generated.
     */
    public async createNewTable(newTableName: string): Promise<TableId> {
        const newTableState: ServerTableState = { ...initialTableState, name: newTableName };
        return this.stateService.create(newTableState);
    }

    /**
     * Get a full ServerTableState by id
     * @param id The id of the table to retrieve
     * @returns A ServerTableState
     */
    public async getTableById(id: TableId): Promise<ServerTableState> {
        return this.stateService.getState(id);
    }

    /**
     * Update an existing table with new values.
     * @param id The id of the table to update
     * @param updatedTable A partial of a ServerTableState containing the values to update
     */
    public async updateTable(id: TableId, updatedTable: Partial<ServerTableState>): Promise<void> {
        return this.stateService.update(id, updatedTable);
    }

    /**
     * Delete a table
     * @param id The id of the table to delete
     */
    public async deleteTable(id: TableId): Promise<void> {
        return this.stateService.delete(id);
    }
}
