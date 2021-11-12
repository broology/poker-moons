import type { Card } from './card';
import type { PlayerId, PublicPlayer } from './player';
import type { Table } from './table';

export interface SharedTableState extends Pick<Table, 'seatMap' | 'roundCount' | 'activeRound'> {
    /**
     * Project out the cards on the player
     */
    playerMap: Record<PlayerId, PublicPlayer>;
}

export interface ClientTableState extends SharedTableState {
    cards: [Card, Card] | [];
}

export interface ServerTableState extends SharedTableState {
    deck: Card[];
    playerCards: Record<PlayerId, [Card, Card] | []>;
}