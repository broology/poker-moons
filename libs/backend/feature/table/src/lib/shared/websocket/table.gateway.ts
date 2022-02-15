import { TableId, TABLE_NAMESPACE } from '@poker-moons/shared/type';
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TableGatewayService } from './table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';

@WebSocketGateway({ namespace: TABLE_NAMESPACE })
export class TableGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger('Table Gateway');

    constructor(
        private tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
    ) {}

    afterInit(server: Server): void {
        this.tableGatewayService.init(server);
    }

    /**
     * Client joins a table's room when they connect to the table websocket
     */
    async handleConnection(client: Socket): Promise<void> {
        const tableId = client.handshake.query.tableId;

        // Confirm tableId was sent via socket
        if (tableId == null) {
            this.logger.error('Table Gateway - tableId was not sent in socket request');
            client.disconnect();
            return;
        }

        const serverTableState = await this.tableStateManagerService.getTableById(tableId as TableId);

        // Confirm that the tableId given in the socket request actually links to a table state
        if (!serverTableState) {
            this.logger.error('Table Gateway - attempted to connect to a table that does not exist');
            client.disconnect();
            return;
        }

        this.logger.log(`${client.handshake.address} connected to ${tableId}`);

        client.join(tableId);

        // Emit shared table state
        const { name, seatMap, roundCount, activeRound } = serverTableState;
        client.emit('connected', { name, seatMap, roundCount, activeRound });
    }

    /**
     * Client leaves a table's room when they disconnect from the table websocket
     */
    handleDisconnect(client: Socket): void {
        const tableId = client.handshake.query.tableId as TableId;

        this.logger.log(`${client.handshake.address} disconnected from ${tableId}`);

        client.leave(tableId);
    }
}
