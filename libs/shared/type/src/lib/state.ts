import type { StrictOmit } from 'ts-essentials';
import type { Card } from './card';
import type { Player, PlayerId } from './player';
import type { Table } from './table';

export interface SharedTableState extends Pick<Table, 'seatMap' | 'roundCount' | 'activeRound'> {
    /**
     * Project out the cards on the player
     */
    playerMap: Record<PlayerId, StrictOmit<Player, 'cards'>>;
}

export interface ClientTableState extends SharedTableState {
    cards: [Card, Card] | [];
}

export interface ServerTableState extends SharedTableState {
    deck: Card[];
    playerCards: Record<PlayerId, [Card, Card] | []>;
}
