import type { Player, PlayerId } from './player';
import type { Round } from './round';

export const TABLE_PREFIX = 'table' as const;

export type TableId = `table_${string}`;

export const seats = [0, 1, 2, 3, 4, 5] as const;
export type SeatId = typeof seats[number];

export interface Table {
    id: TableId;

    /**
     * The name of the table
     */
    name: string;

    /**
     * A map of seats at the table to the players associated with them
     * seatMap defines order of seats (keys) and associated players (values)
     *
     *
     */
    seatMap: Partial<Record<SeatId, PlayerId>>;

    /**
     * A dictionary of the players sitting at the table
     */
    playerMap: Record<PlayerId, Player> | null;

    /**
     * The number of rounds played around a game.
     * - The round ends when someone takes the pot.
     */
    roundCount: number;

    /**
     * The active round of the table
     */
    activeRound: Round | null;
}
