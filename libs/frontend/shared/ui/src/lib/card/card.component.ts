import { Component, Input } from '@angular/core';
import { Card } from '@poker-moons/shared/type';

type CardDisplayView = 'face' | 'back' | 'none';

@Component({
    selector: 'poker-moons-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    BACK_OF_CARD_ASSET = '/cards/back.png';

    /**
     * The card to be displayed. If given null display the back of the card
     *
     * - `Card`: displays given card
     * - `null`: displays back of card
     * - `undefined`: displays nothing
     */
    @Input() card!: Card | null | undefined;

    get displayView(): CardDisplayView {
        if (this.card === undefined) {
            return 'none';
        } else if (this.card === null) {
            return 'back';
        } else {
            return 'face';
        }
    }

    /**
     * Builds informative alt text for the card if it was not to be loaded.
     */
    buildAltText(card: Card): string {
        return `Suit: ${card.suit}, Rank: ${card.rank}`;
    }

    /**
     * Builds the relative asset path to the specific card in the deck.
     *
     * - These card assets have manually been placed into the S3 bucket under the `/cards` path.
     */
    getCardAsset(card: Card): string {
        return `/cards/${card.rank}-${card.suit}.png`;
    }
}
