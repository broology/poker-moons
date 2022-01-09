import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Card } from '@poker-moons/shared/type';
import { applyMeisterCard, cardToCardMeister } from './meister/card.adapter';

@Component({
    selector: 'poker-moons-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit, OnChanges {
    private rendered = false;

    /**
     * The card to be displayed. If given null display the back of the card
     *
     * - `Card`: displays given card
     * - `null`: displays back of card
     * - `undefined`: displays nothing
     */
    @Input() card: Card | null | undefined;

    @ViewChild('card') htmlCard: ElementRef | undefined;

    ngAfterViewInit(): void {
        this.apply(this.card);
        this.rendered = true;
    }

    /**
     * On card data update, re-apply the card
     */
    ngOnChanges(): void {
        if (this.rendered) {
            this.apply(this.card);
        }
    }

    /**
     * Takes the card data and injects it into the meister card component
     */
    private apply(card: Card | null | undefined) {
        if (this.htmlCard && card !== undefined) {
            const ref = this.htmlCard.nativeElement;
            const attrs = cardToCardMeister(card);

            for (const [field, value] of Object.entries(attrs)) {
                ref.setAttribute(field, value);
            }

            applyMeisterCard(this.htmlCard.nativeElement);
        }
    }
}
