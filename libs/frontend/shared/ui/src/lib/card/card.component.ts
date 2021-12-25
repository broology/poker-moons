import { Component, Input } from '@angular/core';
import { Card } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    /**
     * The card to be displayed. If given null display the back of the card
     *
     * - `Card`: displays given card
     * - `null`: displays back of card
     */
    @Input() card!: Card | null;
}
