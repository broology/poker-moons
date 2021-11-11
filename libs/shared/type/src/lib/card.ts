type Suit = 'C' | 'D' | 'H' | 'S';
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

/**
 * A card in a deck containing a `Suit` and a `Rank`
 *
 * @example
 * 'C1' // Ace of Clubs
 * 'D12' // Queen of Diamonds
 */
export type Card = `${Suit}${Rank}`;
