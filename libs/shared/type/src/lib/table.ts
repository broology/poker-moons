import type { Player, PlayerId } from './player';
import type { Round } from './round';

export const TABLE_PREFIX = 'table' as const;

export type TableId = `table_${string}`;

export const seats = [0, 1, 2, 3, 4, 5] as const;
export type SeatId = typeof seats[number];

/**
 * @description Status of the table.
 *
 * - `lobby`: Players are not ready yet.
 * - `in-progress`: Game is in progress.
 * - `ended`: Game has finished.
 */
export type TableStatus = 'lobby' | 'in-progress' | 'ended';

export interface Table {
    id: TableId;

    /**
     * @description A map of seats at the table to the players associated with them seatMap defines order of seats
     * (keys) and associated players (values)
     */
    seatMap: Partial<Record<SeatId, PlayerId>>;

    /**
     * @description A dictionary of the players sitting at the table.
     */
    playerMap: Record<PlayerId, Player>;

    /**
     * @description The number of rounds played around a game.
     *
     * - The round ends when someone takes the pot.
     */
    roundCount: number;

    /**
     * @description The active round of the table.
     */
    activeRound: Round;

    /**
     * @description Status of the table.
     */
    status: TableStatus;

    /**
     * @description Date when the table is started. This is initially `null` and is set when the ready system queue
     * job is completed for the table.
     */
    startDate: Date | null;
}
