import { Table } from '@poker-moons/shared/type';
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
