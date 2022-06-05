import { Inject, Injectable } from '@nestjs/common';
import { GenericStateServiceImpl, STATE_SERVICE } from '@poker-moons/backend/data-access/state';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Player, PlayerId, Round, SeatId, ServerTableState, TableId } from '@poker-moons/shared/type';

const initialTableState: ServerTableState = {
    id: '' as TableId,
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
    startDate: null,
    status: 'lobby',
};

@Injectable()
export class TableStateManagerService {
    private logger = new CustomLoggerService(TableStateManagerService.name);

    constructor(@Inject(STATE_SERVICE) private readonly stateService: GenericStateServiceImpl) {}

    /**
     * Create a new table (a new game) from scratch. Creates a "default" table, with nothing in
     * it and will require updates as players get added, etc.
     * @param newTableName The name of the table/game.
     * @returns The TableId of the new table, as generated.
     */
    public async createNewTable(newTableName: string): Promise<TableId> {
        const newTableState: ServerTableState = { ...initialTableState, name: newTableName };
        this.logger.debug('Newly created table state: ' + JSON.stringify(newTableState, null, 4));
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
     * Update an existing player at a table
     * @param id The id of the table to update
     * @param updatedPlayerId The id of the player to update
     * @param updatedPlayer A partial of a Player containing the values to update
     */
    public async updateTablePlayer(
        id: TableId,
        updatedPlayerId: PlayerId,
        updatedPlayer: Partial<Player>,
    ): Promise<void> {
        const tableToUpdate: ServerTableState = await this.stateService.getState(id);
        tableToUpdate.playerMap[updatedPlayerId] = {
            ...tableToUpdate.playerMap[updatedPlayerId],
            ...updatedPlayer,
        };
        this.logger.debug('Updated table player (full table): ' + JSON.stringify(tableToUpdate, null, 4));
        await this.stateService.update(id, tableToUpdate);
    }

    /**
     * Add a new player to a table
     * @param id The id of the table to add the player to
     * @param newPlayer The new player object to add
     */
    public async addNewPlayerToTable(id: TableId, seatId: SeatId, newPlayer: Player): Promise<void> {
        const tableToUpdate: ServerTableState = await this.stateService.getState(id);

        tableToUpdate.playerMap[newPlayer.id] = newPlayer;
        tableToUpdate.seatMap[seatId] = newPlayer.id;

        this.logger.debug('Newly added player (full table): ' + JSON.stringify(tableToUpdate, null, 4));
        await this.stateService.update(id, tableToUpdate);
    }

    /**
     * Update the round state of a table
     * @param id The id of the table to update
     * @param updatedRound A partial of a Round containing the values to update
     */
    public async updateRound(id: TableId, updatedRound: Partial<Round>): Promise<void> {
        const tableToUpdate: ServerTableState = await this.stateService.getState(id);
        tableToUpdate.activeRound = {
            ...tableToUpdate.activeRound,
            ...updatedRound,
        };
        this.logger.debug('Newly updated round (full table): ' + JSON.stringify(tableToUpdate, null, 4));
        await this.stateService.update(id, tableToUpdate);
    }

    /**
     * Update all players on the table
     * @param id The id of the table to update
     * @param data The data to update the players
     */
    public async updateAllPlayers(id: TableId, data: Partial<Player>): Promise<void> {
        const table: ServerTableState = await this.stateService.getState(id);

        const updatedPlayerMap = Object.values(table.playerMap).reduce<Record<PlayerId, Player>>(
            (prev, cur) => ({
                ...prev,
                [cur.id]: {
                    ...cur,
                    ...data,
                },
            }),
            {},
        );

        const updatedTable = { ...table, playerMap: updatedPlayerMap };

        this.logger.debug('Newly updated round (full table): ' + JSON.stringify(updatedTable, null, 4));
        await this.stateService.update(id, updatedTable);
    }

    /**
     * Update the seat map of a table
     * @param id The id of the table to update
     * @param updatedSeatMap A partial of a complete seat map, containing that values to update
     */
    public async updateSeatMap(id: TableId, updatedSeatMap: Partial<Record<SeatId, PlayerId>>): Promise<void> {
        const tableToUpdate: ServerTableState = await this.stateService.getState(id);
        tableToUpdate.seatMap = {
            ...tableToUpdate.seatMap,
            ...updatedSeatMap,
        };
        this.logger.debug('Newly updated seat map (full table): ' + JSON.stringify(tableToUpdate, null, 4));
        await this.stateService.update(id, tableToUpdate);
    }

    /**
     * Delete a table
     * @param id The id of the table to delete
     */
    public async deleteTable(id: TableId): Promise<void> {
        return this.stateService.delete(id);
    }
}
