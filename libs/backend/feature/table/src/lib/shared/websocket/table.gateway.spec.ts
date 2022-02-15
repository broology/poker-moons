import { mockRound } from '@poker-moons/shared/testing';
import { TableId } from '@poker-moons/shared/type';
import { mock, mockReset } from 'jest-mock-extended';
import { Socket } from 'socket.io';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from './table-gateway.service';
import { TableGateway } from './table.gateway';

describe('TableGateway', () => {
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManagerService = mock<TableStateManagerService>();
    const gateway = new TableGateway(tableGatewayService, tableStateManagerService);
    const mockSocket = mock<Socket>();

    afterEach(() => {
        mockReset(tableStateManagerService);
        mockReset(tableGatewayService);
        mockReset(mockSocket);
    });

    const tableId: TableId = 'table_1';

    describe('handleConnection', () => {
        it('should disconnect when the tableId is not in the socket request', async () => {
            mockSocket.handshake.query = {};

            await gateway.handleConnection(mockSocket);

            expect(mockSocket.disconnect).toHaveBeenCalled();
            expect(mockSocket.join).not.toHaveBeenCalled();
        });

        it('should disconnect when the tableId in the socket request does not link to a table', async () => {
            mockSocket.handshake.query = { tableId };

            await gateway.handleConnection(mockSocket);

            expect(mockSocket.disconnect).toHaveBeenCalled();
            expect(mockSocket.join).not.toHaveBeenCalled();
        });

        it('should connect and emit the state', async () => {
            tableStateManagerService.getTableById.mockResolvedValue({
                name: 'Table 1',
                seatMap: {},
                roundCount: 1,
                activeRound: mockRound(),
                playerMap: {},
                deck: [],
            });

            mockSocket.handshake.query = { tableId };

            await gateway.handleConnection(mockSocket);

            expect(mockSocket.join).toHaveBeenCalledWith(tableId);
            expect(mockSocket.emit).toHaveBeenCalledWith('connected', {
                name: 'Table 1',
                seatMap: {},
                roundCount: 1,
                activeRound: mockRound(),
            });
        });
    });

    describe('handleDisconnect', () => {
        it('should have client leave the room', async () => {
            mockSocket.handshake.query = { tableId };

            await gateway.handleDisconnect(mockSocket);

            expect(mockSocket.leave).toHaveBeenCalled();
        });
    });
});
