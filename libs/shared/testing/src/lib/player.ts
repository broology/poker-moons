import { merge } from '@poker-moons/shared/util';
import { PublicPlayer } from '@poker-moons/shared/type';
import { DeepPartial } from 'ts-essentials';

export function mockPublicPlayer(overrides: DeepPartial<PublicPlayer> = {}): PublicPlayer {
    const publicPlayer: PublicPlayer = {
        id: 'player_1',
        username: 'test',
        img: '',
        stack: 1000,
        status: 'waiting',
        called: 100,
        seatId: 1,
    };

    return merge(publicPlayer, overrides);
}
