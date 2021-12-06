import { PlayerJoinedTableEvent, PlayerLeftTableEvent, PlayerTurnEvent, RoundStatusChangedEvent, TableId, WinnerWinnerChickenDinnerEvent } from '@poker-moons/shared/type';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class TableGatewayService {
    private server: Server;

    init(server: Server): void {
        this.server = server;
    }

    /**
     * Emits to client when a player joins the table
     */
    emitPlayerJoinedTable(tableId: TableId, event: PlayerJoinedTableEvent): void {
        this.server.to(tableId).emit(event.type, event);
    }

    /**
     * Emits to client when a player leaves the table
     */
    emitPlayerLeftTable(tableId: TableId, event: PlayerLeftTableEvent): void {
        this.server.to(tableId).emit(event.type, event);
    }

    /**
     * Emits to client when the status of the round changes
     */
    emitRoundStatusChange(tableId: TableId, event: RoundStatusChangedEvent): void {
        this.server.to(tableId).emit(event.type, event);
    }

    /**
     * Emits to client when a player takes their turn
     */
    emitPlayerTurn(tableId: TableId, event: PlayerTurnEvent): void {
        this.server.to(tableId).emit(event.type, event);
    }

    /**
     * Emits to client when a winner has been determined
     */
    emitWinner(tableId: TableId, event: WinnerWinnerChickenDinnerEvent): void {
        this.server.to(tableId).emit(event.type, event);
    }
}