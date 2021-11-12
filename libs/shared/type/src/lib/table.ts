import type { Player, PlayerId } from './player';
import type { Round } from './round';

export type TableId = `table_${string}`;

export type SeatId = 0 | 1 | 2 | 3 | 4 | 5;

export interface Table {
    id: TableId;

    /**
     * The name of the table
     */
    name: string;

    /**
     * A map of seats at the table and the players associated with them
     */
    seatMap: Record<SeatId, { playerId: PlayerId; nextSeat: SeatId }>;

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
}
