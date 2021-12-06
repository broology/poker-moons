import { TableEvent, TableId } from '@poker-moons/shared/type';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class TableGatewayService {
    private server: Server;

    init(server: Server): void {
        this.server = server;
    }

    /**
     * Emits a table event to the client
     */
    emitTableEvent(tableId: TableId, event: TableEvent): void {
        this.server.to(tableId).emit(event.type, event);
    }
}
