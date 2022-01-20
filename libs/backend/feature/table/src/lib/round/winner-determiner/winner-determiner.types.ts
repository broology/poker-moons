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
] as const;
export type HandCategory = typeof handCategory[number];

export type PlayerWithHand = Pick<Player, 'id' | 'username'> & {
    /**
     * The five cards that make up the player's hand
     */
    hand: Hand;
};

export interface RankHandReponse {
    /**
     * The player associated with the ranked hand
     */
    player: PlayerWithHand;

    /**
     * The category/rank associated with the hand
     */
    category: HandCategory;

    /**
     * The score associated with the hand
     */
    score: number;
}
