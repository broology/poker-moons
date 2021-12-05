import { ImmutablePublicPlayer, Player } from '..';
import type { Card } from './card';
import type { MutablePublicPlayer, PlayerId } from './player';
import type { Table, TableId } from './table';

export type SharedTableState = Pick<Table, 'seatMap' | 'roundCount' | 'activeRound'>;

export interface ClientTableState extends SharedTableState {
    cards: [Card, Card] | [];

    /**
     * The `playerId` of client, if null, then the user hasn't joined the table yet
     */
    playerId: PlayerId | null;

    /**
     * The `TableId` that is loaded, if null, then the table isn't loaded yet
     */
    tableId: TableId | null;

    /**
     * Map of player data that will be frequently changed.
     */
    mutablePlayerMap: Record<PlayerId, MutablePublicPlayer>;

    /**
     * Map of player data that will (for the most part) stay the same during the game
     */
    immutablePlayerMap: Record<PlayerId, ImmutablePublicPlayer>;
}

export interface ServerTableState extends SharedTableState {
    deck: Card[];

    playerMap: Record<PlayerId, Player>;
}
