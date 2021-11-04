import { Player, PlayerId } from "./player";

export type TableId = `table_${string}`;

export interface Table {
    id: TableId;

    /**
     * The name of the table
     */
    name: string;

    /**
     * The array of playerIds at the table
     */
    playerIds: PlayerId[];

    /**
     * A dictionary of the players sitting at the table
     */
    players: Player[];

    /**
     * The number of rounds played around a game.
     * - The round ends when someone takes the pot.
     */
    roundCount: number;
}
