import { ClientTableState, ServerTableState, SharedTableState, Table } from '@poker-moons/shared/type';
import { merge } from '@poker-moons/shared/util';
import { DeepPartial } from 'ts-essentials';
import { mockRound } from '..';
import { mockImmutablePublicPlayer, mockMutablePublicPlayer, mockPlayer } from './player';

/**
 * @default "Mocks the start of a round after blinds have been set.""
 */
export function mockTable(overrides: DeepPartial<Table> = {}): Table {
    const table: Table = {
        id: `table_${Math.round(Math.random() * 100000)}`,
        seatMap: {},
        playerMap: {},
        roundCount: 0,
        activeRound: mockRound(),
        startDate: null,
        status: 'lobby',
    };

    return merge(table, overrides);
}

function mockSharedTableState(overrides: DeepPartial<SharedTableState> = {}) {
    const table: SharedTableState = {
        seatMap: {
            0: 'player_0',
            1: 'player_1',
            2: 'player_2',
            3: 'player_3',
            4: 'player_4',
            5: 'player_5',
        },
        roundCount: 0,
        activeRound: mockRound(),
        startDate: null,
        status: 'lobby',
    };

    return merge(table, overrides);
}

export function mockServerTableState(overrides: DeepPartial<ServerTableState> = {}): ServerTableState {
    const table: ServerTableState = {
        id: 'table_1',
        deck: [{ suit: 'diamonds', rank: '2' }],
        playerMap: {
            player_0: mockPlayer({
                id: 'player_0',
                username: '0',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                seatId: 0,
                cards: [],
            }),
            player_1: mockPlayer({
                id: 'player_1',
                username: '1',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                seatId: 1,
                cards: [],
                ready: false,
            }),
            player_2: mockPlayer({
                id: 'player_2',
                username: '2',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                seatId: 2,
                cards: [],
            }),
            player_3: mockPlayer({
                id: 'player_3',
                username: '3',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                seatId: 3,
                cards: [],
            }),
            player_4: mockPlayer({
                id: 'player_4',
                username: '4',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                seatId: 4,
                cards: [],
            }),
            player_5: mockPlayer({
                id: 'player_5',
                username: '5',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                seatId: 5,
                cards: [],
            }),
        },
        ...mockSharedTableState(),
    };

    return merge(table, overrides);
}

export function mockClientTableState(overrides: DeepPartial<ClientTableState> = {}): ClientTableState {
    const table: ClientTableState = {
        tableId: 'table_1',
        playerId: 'player_1',
        cards: [],
        mutablePlayerMap: {
            player_0: mockMutablePublicPlayer({
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                cards: [],
            }),
            player_1: mockMutablePublicPlayer({
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                cards: [],
            }),
            player_2: mockMutablePublicPlayer({
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                cards: [],
            }),
            player_3: mockMutablePublicPlayer({
                stack: 1000,
                status: 'waiting',
                biddingCycleCalled: 100,
                cards: [],
            }),
        },
        immutablePlayerMap: {
            player_0: mockImmutablePublicPlayer({
                id: 'player_0',
                username: '0',
                img: 'img',
                seatId: 0,
            }),
            player_1: mockImmutablePublicPlayer({
                id: 'player_1',
                username: '1',
                img: 'img',
                seatId: 0,
            }),
            player_2: mockImmutablePublicPlayer({
                id: 'player_2',
                username: '2',
                img: 'img',
                seatId: 0,
            }),
            player_3: mockImmutablePublicPlayer({
                id: 'player_3',
                username: '3',
                img: 'img',
                seatId: 0,
            }),
        },
        ...mockSharedTableState(),
    };

    return merge(table, overrides);
}
