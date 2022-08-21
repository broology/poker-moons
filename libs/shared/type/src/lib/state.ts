import { ImmutablePublicPlayer, Player } from '..';
import type { Card } from './card';
import type { MutablePublicPlayer, PlayerId } from './player';
import type { Table, TableId } from './table';

export type SharedTableState = Pick<Table, 'seatMap' | 'roundCount' | 'activeRound' | 'status' | 'startDate'>;

export interface ClientTableState extends SharedTableState {
    /**
     * @description The `playerId` of client, if null, then the user hasn't joined the table yet.
     */
    playerId: PlayerId | null;

    /**
     * @description The `TableId` that is loaded, if null, then the table isn't loaded yet.
     */
    tableId: TableId | null;

    /**
     * @description Map of player data that will be frequently changed.
     */
    mutablePlayerMap: Record<PlayerId, MutablePublicPlayer>;

    /**
     * @description Map of player data that will (for the most part) stay the same during the game.
     */
    immutablePlayerMap: Record<PlayerId, ImmutablePublicPlayer>;
}

export interface ServerTableState extends SharedTableState {
    id: TableId;

    deck: Card[];

    playerMap: Record<PlayerId, Player>;
}
