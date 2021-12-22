import { ImmutablePublicPlayer, MutablePublicPlayer, PublicPlayer } from '@poker-moons/shared/type';
import { merge } from '@poker-moons/shared/util';
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

export function mockImmutablePublicPlayer(overrides: DeepPartial<ImmutablePublicPlayer> = {}): ImmutablePublicPlayer {
    const immutablePublicPlayer: ImmutablePublicPlayer = {
        id: 'player_1',
        username: 'test',
        img: '',
        seatId: 1,
    };

    return merge(immutablePublicPlayer, overrides);
}

export function mockMutablePublicPlayer(overrides: DeepPartial<MutablePublicPlayer> = {}): MutablePublicPlayer {
    const mutablePublicPlayer: MutablePublicPlayer = {
        stack: 100,
        status: 'called',
        called: 10,
    };

    return merge(mutablePublicPlayer, overrides);
}
