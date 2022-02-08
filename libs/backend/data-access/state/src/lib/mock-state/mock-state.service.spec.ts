import { MockStateService } from './mock-state.service';
import { Test } from '@nestjs/testing';
import { Player, Round, ServerTableState, TableId } from '@poker-moons/shared/type';

describe('MockStateService', () => {
    let service: MockStateService;
    it('should create a table', async () => {
        const module = await Test.createTestingModule({
            providers: [MockStateService],
        }).compile();
        service = module.get<MockStateService>(MockStateService);
        const mockPlayer: Player = {
            id: `player_${'1'}`,
            username: 'test',
            img: 'test',
            stack: 4,
            status: `waiting`,
            called: 0,
            seatId: null,
            cards: [],
        };
        const mockRound: Round = {
            pot: 0,
            toCall: 0,
            turnCount: 0,
            roundStatus: 'deal',
            activeSeat: null,
            dealerSeat: 0,
            smallBlind: 0,
            cards: [],
        };
        const mockTableState: ServerTableState = {
            name: 'test',
            deck: [],
            playerMap: { player_1: mockPlayer },
            seatMap: { 0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined, 5: undefined },
            roundCount: 0,
            activeRound: mockRound,
        };
        const id: TableId = await service.create(mockTableState);
        const id2: TableId = await service.create(mockTableState);
        console.log(id);
        console.log(id2);
    });
});
