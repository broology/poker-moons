import { TableId, TABLE_NAMESPACE } from '@poker-moons/shared/type';
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TableGatewayService } from './table-gateway.service';

@WebSocketGateway({ namespace: TABLE_NAMESPACE })
export class TableGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger('Table Gateway');

    constructor(private tableGatewayService: TableGatewayService) {}

    afterInit(server: Server): void {
        this.tableGatewayService.init(server);
    }

    /**
     * Client joins a table's room when they connect to the table websocket
     */
    handleConnection(client: Socket): void {
        const tableId = client.handshake.query.tableId;

        // Confirm tableId was sent via socket
        if (tableId == null) {
            this.logger.error('Table Gateway - tableId was not sent in socket request');
            client.disconnect();
            return;
        }

        // TODO: Confirm that the tableId given in the socket request actually links to a table

        this.logger.log(`${client.handshake.address} connected to ${tableId}`);

        client.join(tableId);

        // TODO: Emit state
        client.emit('connected', {});
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
