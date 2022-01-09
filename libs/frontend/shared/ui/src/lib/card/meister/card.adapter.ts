import { Card } from '@poker-moons/shared/type';
import { gen } from './elements.cardmeister.min';

/**
 * Interface of parameters that can be applied to the meister `card-t`.
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
 * Converts the card data we store to parameters for meister `card-t`'s card.
 *
 * @see https://github.com/cardmeister/cardmeister.github.io for more details
 *
 * @param card - the suite and the rank to be displayed. If null back of card
 * @returns - list of meister card paramaters to create the `card`
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
        rank: parseInt(card.rank).toString(),
    };
}

/**
 * Applies the cardmeister script onto the image element.
 * Which must already have all the necessary attributes created in {@link cardToCardMeister}
 *
 * @param ref - The html image element
 */
export const applyMeisterCard = (ref: HTMLImageElement) => gen(ref);
