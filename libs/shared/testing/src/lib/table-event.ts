import { ConnectedEvent } from '@poker-moons/shared/type';
import { merge } from '@poker-moons/shared/util';
import { DeepPartial } from 'ts-essentials';
import { mockTable } from './table';

export function mockConnectedEvent(overrides: DeepPartial<ConnectedEvent> = {}): ConnectedEvent {
    const event: ConnectedEvent = {
        type: 'connected',
        state: {
            ...mockTable(),
        },
    };

    return merge(event, overrides);
}
