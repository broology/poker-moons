import type { Card, Player } from '@poker-moons/shared/type';

export type Hand = [Card, Card, Card, Card, Card];

export const handCategory = [
    'royal flush',
    'straight flush',
    'four of a kind',
    'full house',
    'flush',
    'straight',
    'three of a kind',
    'two pairs',
    'pair',
    'high card',
    'win via fold',
] as const;
export type HandCategory = typeof handCategory[number];

export type PlayerWithHand = Pick<Player, 'id' | 'username' | 'roundCalled'> & {
    cards: [Card, Card];

    /**
     * @description The five cards that make up the player's hand.
     *
     * Will be null only if the player has won due to everyone else folding.
     */
    hand: Hand | null;
};

export interface RankHandReponse {
    /**
     * @description The player associated with the ranked hand.
     */
    player: PlayerWithHand;

    /**
     * @description The category/rank associated with the hand.
     */
    category: HandCategory;

    /**
     * @description The score associated with the hand.
     */
    score: number;
}
