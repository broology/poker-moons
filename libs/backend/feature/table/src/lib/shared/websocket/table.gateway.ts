import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    ClientTableState,
    ImmutablePublicPlayer,
    MutablePublicPlayer,
    PlayerId,
    ServerTableState,
    TableId,
    TABLE_NAMESPACE,
} from '@poker-moons/shared/type';
import { Server, Socket } from 'socket.io';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from './table-gateway.service';

@WebSocketGateway({ namespace: TABLE_NAMESPACE })
export class TableGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger = new CustomLoggerService(TableGateway.name);

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

        // Emit client table state
        const clientState = this.convertServerStateToClientState(tableId as TableId, serverTableState);
        client.emit('connected', clientState);
    }

    /**
     * Client leaves a table's room when they disconnect from the table websocket
     */
    handleDisconnect(client: Socket): void {
        const tableId = client.handshake.query.tableId as TableId;

        this.logger.log(`${client.handshake.address} disconnected from ${tableId}`);

        client.leave(tableId);
    }

    private convertServerStateToClientState(
        tableId: TableId,
        serverState: ServerTableState,
    ): Omit<ClientTableState, 'playerId'> {
        const { name, seatMap, roundCount, activeRound, playerMap, startDate, status } = serverState;

        const mutablePlayerMap: Record<PlayerId, MutablePublicPlayer> = {};
        const immutablePlayerMap: Record<PlayerId, ImmutablePublicPlayer> = {};

        for (const [playerId, player] of Object.entries(playerMap)) {
            const { id, username, img, seatId, stack, status, called, ready, cards } = player;

            mutablePlayerMap[playerId as PlayerId] = {
                stack,
                status,
                called,
                cards: cards.length === 2 ? [null, null] : [],
                ready,
            };
            immutablePlayerMap[playerId as PlayerId] = { id, username, img, seatId };
        }

        return {
            tableId,
            name,
            seatMap,
            roundCount,
            activeRound,
            cards: [],
            mutablePlayerMap,
            immutablePlayerMap,
            startDate,
            status,
        };
    }
}
