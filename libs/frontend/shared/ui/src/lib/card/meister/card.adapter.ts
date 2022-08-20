import { Card, Rank } from '@poker-moons/shared/type';

/**
 * @description Interface of parameters that can be applied to the meister `card-t`.
 *
 * - Only added the ones being used so far.
 *
 * @see https://github.com/cardmeister/cardmeister.github.io for more parameters
 */
interface MeisterCardAttr {
    suit?: string;
    rank?: string;
    backcolour?: string;
    backtext?: string;
}

/**
 * @description Converts the PokerMoons `Rank` to the Meister library rank value.
 *
 * @param rank - PokerMoons `Rank` of card.
 *
 * @returns - Meister `Rank` of card.
 */
function rankToCartMeisterRank(rank: Rank): string {
    switch (rank) {
        // Ace is displayed as '1' in meister
        case '14':
            return '1';
        default:
            return parseInt(rank).toString();
    }
}

/**
 * @description Converts the card data we store to parameters for meister `card-t`'s card.
 *
 * @param card - The suite and the rank to be displayed. If null back of card.
 *
 * @returns - List of meister card paramaters to create the `card`
 *
 * @see https://github.com/cardmeister/cardmeister.github.io for more details
 */
export function cardToCardMeister(card: Card | null): MeisterCardAttr {
    if (card === null) {
        return {
            suit: undefined,
            rank: '0',
            backcolour: '#44F',
            backtext: '',
        };
    }

    return {
        suit: card.suit,
        rank: rankToCartMeisterRank(card.rank),
    };
}
