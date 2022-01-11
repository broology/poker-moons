import { Component } from '@angular/core';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Card, rank, suit } from '@poker-moons/shared/type';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CardModule } from './card.module';

/**
 * This story is to display all cards in the deck
 */

@Component({
    selector: 'poker-moons-deck-display',
    template: `
        <div *ngFor="let row of CARD_GRID">
            <span *ngFor="let card of row" style="margin: .1em;">
                <poker-moons-card [card]="card"></poker-moons-card>
            </span>
        </div>
    `,
})
class DeckDisplayComponent {
    CARD_GRID = suit
        // Build Array of all possible cards
        .reduce<Card[]>((prev, cur) => {
            for (const r of rank) {
                prev.push({ rank: r, suit: cur });
            }
            return prev;
        }, [])
        // Reduce cards into a2D grid with 4 columns for easy display
        .reduce<Card[][]>((prev, cur, idx) => {
            const col = Math.floor(idx / 4);

            if (!prev[col]) {
                prev[col] = [];
            }
            prev[col].push(cur);

            return prev;
        }, []);
}

export default {
    title: 'DeckDisplay',
    component: DeckDisplayComponent,
    decorators: [
        moduleMetadata({
            imports: [CardModule],
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<DeckDisplayComponent>;

const Template: Story<DeckDisplayComponent> = (args: DeckDisplayComponent) => ({
    component: DeckDisplayComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {};
