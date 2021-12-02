import { Observable } from 'rxjs';
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export class SocketClient {
    private client: Socket;

    constructor(uri: string, options: Partial<SocketOptions & ManagerOptions>) {
        this.client = io(uri, options);
    }

    connect(): void {
        this.client.connect();
    }

    disconnect(): void {
        if (this.client.connected) {
            this.client.disconnect();
        }
    }

    on<T>(type: string): Observable<T> {
        return new Observable((observer) => {
            this.client.on(type, (data) => {
                observer.next(data);
            });
        });
    }
}
