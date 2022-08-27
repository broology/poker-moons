import type { ImmutablePublicPlayer, MutablePublicPlayer, Player, PublicPlayer } from '@poker-moons/shared/type';
import { merge } from '@poker-moons/shared/util';
import { nanoid } from 'nanoid';
import { DeepPartial } from 'ts-essentials';

export function mockPublicPlayer(overrides: DeepPartial<PublicPlayer> = {}): PublicPlayer {
    const publicPlayer: PublicPlayer = {
        id: 'player_1',
        username: 'test',
        img: '',
        stack: 1000,
        status: 'waiting',
        biddingCycleCalled: 10,
        roundCalled: 10,
        seatId: 1,
        cards: [],
        ready: false,
        timeBank: 120,
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

export function mockMutablePublicPlayer(overrides: Partial<MutablePublicPlayer> = {}): MutablePublicPlayer {
    const mutablePublicPlayer: MutablePublicPlayer = {
        stack: 100,
        status: 'called',
        biddingCycleCalled: 10,
        roundCalled: 10,
        cards: [null, null],
        ready: false,
        timeBank: 120,
    };

    return {
        ...mutablePublicPlayer,
        ...overrides,
    };
}

export function mockPlayer(overrides: DeepPartial<Player> = {}): Player {
    const player: Player = {
        id: 'player_1',
        username: 'test',
        img: '',
        stack: 1000,
        status: 'waiting',
        biddingCycleCalled: 10,
        roundCalled: 10,
        seatId: 1,
        cards: [],
        ready: false,
        timeBank: 120,
        token: nanoid(40),
    };

    return merge(player, overrides);
}
