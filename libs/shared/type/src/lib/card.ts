export const suit = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export type Suit = typeof suit[number];

export const rank = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'] as const;
export type Rank = typeof rank[number];

/**
 * Card
 * @description A card in a deck containing a `Suit` and a `Rank`
 */
export interface Card {
    suit: Suit;
    rank: Rank;
}
