import { Test } from '@nestjs/testing';
import { mockPlayer, mockRound, mockServerTableState } from '@poker-moons/shared/testing';
import { Player, PlayerId, ServerTableState, TableId } from '@poker-moons/shared/type';
import { MockStateService } from './mock-state.service';

const player = mockPlayer({
    id: `player_${'1'}`,
    username: 'test',
    img: 'test',
    stack: 4,
    status: `waiting`,
    roundCalled: 0,
    biddingCycleCalled: 0,
    seatId: null,
    cards: [],
});
const round = mockRound({
    pot: 0,
    toCall: 0,
    turnCount: 0,
    roundStatus: 'deal',
    activeSeat: null,
    dealerSeat: 0,
    smallBlind: 0,
    cards: [],
});

const mockTableState = mockServerTableState({
    id: 'table_1',
    deck: [],
    playerMap: { player_1: player },
    seatMap: { 0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined, 5: undefined },
    roundCount: 0,
    activeRound: round,
});

describe('MockStateService', () => {
    let service: MockStateService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [MockStateService],
        }).compile();
        service = module.get<MockStateService>(MockStateService);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a basic, default table', async () => {
            const id: TableId = await service.create(mockTableState);
            const id1: TableId = await service.create(mockTableState);
            expect(id).toEqual('table_1');
            expect(id1).toEqual('table_2');
        });
    });

    describe('getState', () => {
        it('should properly retrieve a table', async () => {
            await service.create(mockTableState);
            expect(await service.getState('table_1')).toEqual(mockTableState);
        });

        it('should get the correct table when multiple are created', async () => {
            await service.create(mockTableState);
            const mockState = mockServerTableState({
                id: 'table_2',
                deck: [],
                playerMap: { player_1: mockPlayer({}) },
                seatMap: { 0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined, 5: undefined },
                roundCount: 0,
                activeRound: round,
            });
            await service.create(mockState);
            const table1: ServerTableState = await service.getState('table_1');
            expect(table1.id).toEqual('table_1');
            const table2: ServerTableState = await service.getState('table_2');
            expect(table2.id).toEqual('table_2');
        });
    });

    describe('delete', () => {
        it('should delete a table', async () => {
            await service.create(mockTableState);
            await service.delete('table_1');
            expect(await service.getState('table_1')).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update a table - top level', async () => {
            await service.create(mockTableState);
            await service.update('table_1', { roundCount: 2 });
            const table: ServerTableState = await service.getState('table_1');
            expect(table.roundCount).toEqual(2);
        });

        it('should update a table - player', async () => {
            await service.create(mockTableState);
            const table: ServerTableState = await service.getState('table_1');

            const playerMap: Record<PlayerId, Player> = table.playerMap;
            const updatedPlayerMap: Record<PlayerId, Player> = {
                ...playerMap,
                player_1: {
                    ...playerMap.player_1,
                    username: 'Bob',
                },
            };
            await service.update('table_1', { playerMap: updatedPlayerMap });
            const updatedTable: ServerTableState = await service.getState('table_1');
            expect(updatedTable.playerMap.player_1.username).toEqual('Bob');
        });

        it('should update a table - round', async () => {
            await service.create(mockTableState);
            const table: ServerTableState = await service.getState('table_1');
            await service.update('table_1', { activeRound: { ...table.activeRound, pot: 500 } });
            const updatedTable: ServerTableState = await service.getState('table_1');
            expect(updatedTable.activeRound.pot).toEqual(500);
        });

        it('should update a table - seatmap', async () => {
            await service.create(mockTableState);
            const table: ServerTableState = await service.getState('table_1');
            await service.update('table_1', { seatMap: { ...table.seatMap, 0: 'player_1' } });
            const updatedTable: ServerTableState = await service.getState('table_1');
            expect(updatedTable.seatMap['0']).toEqual('player_1');
        });

        it('should add a new player to playermap', async () => {
            await service.create(mockTableState);
            const newPlayer = mockPlayer({
                id: `player_${'2'}`,
                username: 'Bob',
                img: 'test',
                stack: 4,
                status: `waiting`,
                seatId: null,
                cards: [],
            });
            const table: ServerTableState = await service.getState('table_1');
            const playerMap: Record<PlayerId, Player> = table.playerMap;
            let updatedPlayerMap: Record<PlayerId, Player> = {
                ...playerMap,
                [newPlayer.id]: newPlayer,
            };
            await service.update('table_1', { playerMap: updatedPlayerMap });
            const updatedTable: ServerTableState = await service.getState('table_1');
            updatedPlayerMap = updatedTable.playerMap;
            expect(updatedPlayerMap.player_2).toBeDefined();
            expect(updatedPlayerMap.player_2.username).toEqual('Bob');
        });
    });
});
