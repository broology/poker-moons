import { TableId } from '@poker-moons/shared/type';
import { mock, mockReset } from 'jest-mock-extended';
import { Socket } from 'socket.io';
import { TableGatewayService } from './table-gateway.service';
import { TableGateway } from './table.gateway';

describe('TableGateway', () => {
    const tableGatewayService = mock<TableGatewayService>();
    const gateway = new TableGateway(tableGatewayService);
    const mockSocket = mock<Socket>();

    afterEach(() => {
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

        it('should connect and emit the state', async () => {
            mockSocket.handshake.query = { tableId };

            await gateway.handleConnection(mockSocket);

            expect(mockSocket.join).toHaveBeenCalledWith(tableId);
            expect(mockSocket.emit).toHaveBeenCalledWith('connected', {});
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
