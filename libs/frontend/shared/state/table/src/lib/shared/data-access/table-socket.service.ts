import { Inject, Injectable, OnDestroy } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';
import { TableEvent, TableId, TABLE_NAMESPACE } from '@poker-moons/shared/type';
import { Observable } from 'rxjs';
import { SocketClient } from '../util/socket-client';

@Injectable({ providedIn: 'root' })
export class TableSocketService implements OnDestroy {
    private socket!: SocketClient;

    constructor(@Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment) {}

    /**
     * Configures the connection to the websocket, but doesn't actually trigger the connection.
     *
     * @param tableId - The ID of the table the socket is being connected to
     */
    initialize(tableId: TableId): void {
        this.socket = new SocketClient(this.env.api, TABLE_NAMESPACE, {
            query: { tableId },
            reconnection: true,
            transports: ['websocket', 'polling'],
        });
    }

    /**
     * Performs the connection to the websocket
     *
     * `this.initialize` must be called before `connect`
     */
    connect(): void {
        this.socket.connect();
    }

    /**
     * @param type - The table event you with to create an observable for
     * @returns - Observable object of the table event that can be subscribed too
     */
    onEvent<Type extends TableEvent['type']>(type: Type): Observable<Extract<TableEvent, { type: Type }>> {
        return this.socket.on(type);
    }

    /**
     * Clean up on destroy
     */
    ngOnDestroy(): void {
        this.socket?.disconnect();
    }
}
