export const suit = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export type Suit = typeof suit[number];

export const rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'] as const;
export type Rank = typeof rank[number];

/**
 * Card
 * @description A card in a deck containing a `Suit` and a `Rank`
 */
export interface Card {
    suit: Suit;
    rank: Rank;
}
