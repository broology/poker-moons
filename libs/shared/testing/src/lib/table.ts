import { ClientTableState, ServerTableState, Table } from '@poker-moons/shared/type';
import { merge } from '@poker-moons/shared/util';
import { DeepPartial } from 'ts-essentials';
import { mockRound } from '..';

/**
 * @default "Mocks the start of a round after blinds have been set.""
 */
export function mockTable(overrides: DeepPartial<Table> = {}): Table {
    const table: Table = {
        id: `table_${Math.round(Math.random() * 100000)}`,
        name: 'Name of table',
        seatMap: {},
        playerMap: {},
        roundCount: 0,
        activeRound: mockRound(),
    };

    return merge(table, overrides);
}

export function mockServerTableState(overrides: DeepPartial<ServerTableState> = {}): ServerTableState {
    const table: ServerTableState = {
        id: 'table_1',
        name: 'Table 1',
        deck: [{ suit: 'diamonds', rank: '2' }],
        playerMap: {
            player_0: {
                id: 'player_0',
                username: '0',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_1: {
                id: 'player_1',
                username: '1',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_2: {
                id: 'player_2',
                username: '2',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_3: {
                id: 'player_3',
                username: '3',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_4: {
                id: 'player_4',
                username: '4',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
            player_5: {
                id: 'player_5',
                username: '5',
                img: 'img',
                stack: 1000,
                status: 'waiting',
                called: 100,
                seatId: 0,
                cards: [],
            },
        },
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
    };

    return merge(table, overrides);
}

export function mockClientTableState(overrides: DeepPartial<ClientTableState> = {}): ClientTableState {
    const table: ClientTableState = {
        tableId: 'table_1',
        name: 'Table 1',
        playerId: 'player_1',
        cards: [],
        mutablePlayerMap: {
            player_0: {
                stack: 1000,
                status: 'waiting',
                called: 100,
                cards: [],
            },
            player_1: {
                stack: 1000,
                status: 'waiting',
                called: 100,
                cards: [],
            },
            player_2: {
                stack: 1000,
                status: 'waiting',
                called: 100,
                cards: [],
            },
            player_3: {
                stack: 1000,
                status: 'waiting',
                called: 100,
                cards: [],
            },
        },
        immutablePlayerMap: {
            player_0: {
                id: 'player_0',
                username: '0',
                img: 'img',
                seatId: 0,
            },
            player_1: {
                id: 'player_1',
                username: '1',
                img: 'img',
                seatId: 0,
            },
            player_2: {
                id: 'player_2',
                username: '2',
                img: 'img',
                seatId: 0,
            },
            player_3: {
                id: 'player_3',
                username: '3',
                img: 'img',
                seatId: 0,
            },
        },
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
    };

    return merge(table, overrides);
}
