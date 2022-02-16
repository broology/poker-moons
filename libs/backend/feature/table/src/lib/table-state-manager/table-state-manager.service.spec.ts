import { Test } from '@nestjs/testing';
import { TableStateManagerService } from './table-state-manager.service';
import { BackendDataAccessStateModule } from '@poker-moons/backend/data-access/state';
import { Player, ServerTableState, TableId } from '@poker-moons/shared/type';

describe('TableStateManagerService', () => {
    let service: TableStateManagerService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TableStateManagerService],
            imports: [BackendDataAccessStateModule],
        }).compile();

        service = module.get(TableStateManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an initial table state', async () => {
            const id: TableId = await service.createNewTable('testTable');
            const id2: TableId = await service.createNewTable('testTable2');
            expect(id).toEqual('table_1');
            expect(id2).toEqual('table_2');
        });
    });

    describe('getState', () => {
        it('should properly retrieve a table', async () => {
            await service.createNewTable('testTable');
            expect(await service.getTableById('table_1')).toEqual({
                name: 'testTable',
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
            });
        });

        it('should get the correct table when multiple are created', async () => {
            await service.createNewTable('testTable1');
            await service.createNewTable('testTable2');
            const table1 = await service.getTableById('table_1');
            const table2 = await service.getTableById('table_2');
            expect(table1.name).toEqual('testTable1');
            expect(table2.name).toEqual('testTable2');
        });
    });

    describe('delete', () => {
        it('should delate a table', async () => {
            await service.createNewTable('testTable');
            await service.deleteTable('table_1');
            expect(await service.getTableById('table_1')).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update a table - top level', async () => {
            await service.createNewTable('testTable');
            await service.updateTable('table_1', { name: "Your mom's dinner table" });
            const table: ServerTableState = await service.getTableById('table_1');
            expect(table.name).toEqual("Your mom's dinner table");
        });

        it('should update a table - addNewPlayerToTable', async () => {
            await service.createNewTable('testTable');
            const newPlayer: Player = {
                id: `player_${'1'}`,
                username: 'test',
                img: 'test',
                stack: 4,
                status: `waiting`,
                called: 0,
                seatId: null,
                cards: [],
            };
            await service.addNewPlayerToTable('table_1', newPlayer);
            const table = await service.getTableById('table_1');
            expect(table.playerMap['player_1']).toBeDefined();
            expect(table.playerMap.player_1.username).toEqual('test');
        });

        it('should update a table - updateTablePlayer', async () => {
            await service.createNewTable('testTable');
            const newPlayer: Player = {
                id: `player_${'1'}`,
                username: 'test',
                img: 'test',
                stack: 4,
                status: `waiting`,
                called: 0,
                seatId: null,
                cards: [],
            };
            await service.addNewPlayerToTable('table_1', newPlayer);
            await service.updateTablePlayer('table_1', 'player_1', { username: 'Jordan' });
            const table: ServerTableState = await service.getTableById('table_1');
            expect(table.playerMap.player_1.username).toEqual('Jordan');
        });

        it('should update a table - updateRound', async () => {
            await service.createNewTable('testTable');
            await service.updateRound('table_1', { pot: 69 }); //nice
            const table: ServerTableState = await service.getTableById('table_1');
            expect(table.activeRound.pot).toEqual(69);
        });

        it('should update a table - updateSeatMap', async () => {
            await service.createNewTable('testTable');
            await service.updateSeatMap('table_1', { 0: 'player_1' });
            const table: ServerTableState = await service.getTableById('table_1');
            expect(table.seatMap['0']).toEqual('player_1');
        });
    });
});
