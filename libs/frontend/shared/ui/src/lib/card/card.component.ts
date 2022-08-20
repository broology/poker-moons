import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Card } from '@poker-moons/shared/type';
import { cardToCardMeister } from './meister/card.adapter';

@Component({
    selector: 'poker-moons-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    /**
     * @description The card to be displayed. If given null display the back of the card.
     *
     * - `Card`: displays given card.
     * - `null`: displays back of card.
     * - `undefined`: displays nothing.
     */
    @Input() card: Card | null | undefined;

    constructor(private sanitizer: DomSanitizer) {}

    /**
     * @description Converts the given {@link Card} and converts it into the raw html of an equivalent cardmeister ui card.
     *
     * @param card - Rank and suite of the card to be displayed.
     *
     * @returns Html to be rendered for this card.
     *
     * @see https://github.com/cardmeister/cardmeister.github.io for more details
     */
    renderCard(card: Card | null | undefined): SafeHtml {
        if (card === undefined) {
            return '';
        }

        const attributes = cardToCardMeister(card);

        const rawAttributes = Object.entries(attributes)
            .map(([field, value]) => `${field}="${value}"`)
            .join(' ');

        return this.sanitizer.bypassSecurityTrustHtml(`<card-t ${rawAttributes}></card-t>`);
    }
}
