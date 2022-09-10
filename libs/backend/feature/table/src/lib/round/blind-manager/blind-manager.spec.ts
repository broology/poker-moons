import { mockCard, mockRound, mockServerTableState } from '@poker-moons/shared/testing';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { BlindManagerService } from './blind-manager.service';

describe('BlindManagerService', () => {
    const tableStateManagerService = mock<TableStateManagerService>();
    const tableGatewayService = mock<TableGatewayService>();
    const potManagerService = mock<PotManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof BlindManagerService>>] = [
        tableStateManagerService,
        tableGatewayService,
        potManagerService,
    ];

    const service = new BlindManagerService(...params);

    beforeEach(() => {
        for (const param of params) {
            mockReset(param);
        }
    });

    const table = mockServerTableState({
        activeRound: mockRound({ dealerSeat: 0, activeSeat: 1, roundStatus: 'deal' }),
    });
    const playerStatuses = Object.values(table.playerMap).map((player) => player.status);
    const card = mockCard({ suit: 'diamonds', rank: '10' });
    const deck = [card, mockCard()];

    describe('getNextSeat', () => {
        it('should get the correct seat if the current id is 0', async () => {
            expect(service.getNextSeat(table, 0)).toEqual(1);
        });
        it('should get the correct seat if the current id is 1', async () => {
            expect(service.getNextSeat(table, 1)).toEqual(2);
        });
        it('should get the correct seat if the current id is 5 (the last)', async () => {
            expect(service.getNextSeat(table, 5)).toEqual(0);
        });
        it('should get the correct seat if the seat wraps around, but there are less players than 6', async () => {
            const modTable = table;
            delete modTable.playerMap['player_5'];
            delete modTable.playerMap['player_4'];
            delete modTable.seatMap['5'];
            delete modTable.seatMap['4'];
            expect(service.getNextSeat(table, 3)).toEqual(0);
        });
    });
});
