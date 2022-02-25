import { Observable } from 'rxjs';
import { Manager, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export class SocketClient {
    private client: Socket;

    constructor(uri: string, namespace: string, options: Partial<SocketOptions & ManagerOptions>) {
        const manager = new Manager(uri, options);

        this.client = manager.socket(`/${namespace}`);
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
