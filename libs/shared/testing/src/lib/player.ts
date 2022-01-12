import type { ImmutablePublicPlayer, MutablePublicPlayer, Player, PublicPlayer, Table } from '@poker-moons/shared/type';
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
        cards: [],
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
        cards: [],
    };

    return merge(mutablePublicPlayer, overrides);
}

export function mockPlayer(overrides: DeepPartial<Player> = {}): Player {
    const player: Player = {
        id: 'player_1',
        username: 'test',
        img: '',
        stack: 1000,
        status: 'waiting',
        called: 100,
        seatId: 1,
        cards: [],
    };

    return merge(player, overrides);
export function mockTable(overrides: DeepPartial<Table> = {}): Table {
    const table: Table = {
        id: 'table_temp',
        name: 'Temp',
        seatMap: {
            0: 'player_temp0',
            1: 'player_temp1',
            2: 'player_temp2',
            3: 'player_temp3',
            4: 'player_temp4',
            5: 'player_temp5',
        },
        playerMap: {
            player_temp0: {
                id: 'player_temp0',
                username: 'temp0',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_temp1: {
                id: 'player_temp1',
                username: 'temp1',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_temp2: {
                id: 'player_temp2',
                username: 'temp2',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_temp3: {
                id: 'player_temp3',
                username: 'temp3',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_temp4: {
                id: 'player_temp4',
                username: 'temp4',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_temp5: {
                id: 'player_temp5',
                username: 'temp5',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
        },
        roundCount: 0,
        activeRound: {
            pot: 1000,
            toCall: 100,
            turnCount: 0,
            roundStatus: 'deal',
            activeSeat: 0,
            dealerSeat: 0,
            smallBlind: 1,
            cards: [{ suit: 'diamonds', rank: '2' }],
        },
    };
    return merge(table, overrides);
}
