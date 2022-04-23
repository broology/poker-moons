import type { Player, PlayerId } from './player';
import type { Round } from './round';

export const TABLE_PREFIX = 'table' as const;

export type TableId = `table_${string}`;

export const seats = [0, 1, 2, 3, 4, 5] as const;
export type SeatId = typeof seats[number];

/**
 * Status of the table
 * - `lobby`: Players are not ready yet
 * - `in-progress`: Game is in progress
 * - `ended`: Game has finished
 */
export type TableStatus = 'lobby' | 'in-progress' | 'ended';

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
    playerMap: Record<PlayerId, Player>;

    /**
     * The number of rounds played around a game.
     * - The round ends when someone takes the pot.
     */
    roundCount: number;

    /**
     * The active round of the table
     */
    activeRound: Round;

    /**
     * Status of the table
     */
    status: TableStatus;

    /**
     * Date when the table is to start. This is initially `null`,
     * and is set at when
     */
    startDate: Date | null;
}
