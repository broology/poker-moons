import { Component, Input } from '@angular/core';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Card } from '@poker-moons/shared/type';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CardModule } from '../../card';
import { CardOrientation } from './card-orientation-transform.component';
import { CardOrientationTransformModule } from './card-orientation-transform.module';

/**
 * This story is to display all cards in the deck
 */
@Component({
    selector: 'poker-moons-card-orientation-transform-test',
    template: `
        <div style="margin: 10em;">
            <poker-moons-card-orientation-transform [orientation]="orientation">
                <poker-moons-card [card]="card1"></poker-moons-card>
            </poker-moons-card-orientation-transform>
        </div>
    `,
})
class CardOrientationTransformTestComponent {
    @Input() orientation!: CardOrientation;

    card1: Card = {
        suit: 'clubs',
        rank: '2',
    };
    card2 = null;
}

export default {
    title: 'CardOrientationTransformTestComponent',
    component: CardOrientationTransformTestComponent,
    decorators: [
        moduleMetadata({
            imports: [CardOrientationTransformModule, CardModule],
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<CardOrientationTransformTestComponent>;

const Template: Story<CardOrientationTransformTestComponent> = (args: CardOrientationTransformTestComponent) => ({
    component: CardOrientationTransformTestComponent,
    props: args,
});

export const bottom = Template.bind({});
bottom.args = {
    orientation: 'bottom',
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
    orientation: 'bottomLeft',
};

export const bottomRight = Template.bind({});
bottomRight.args = {
    orientation: 'bottomRight',
};

export const left = Template.bind({});
left.args = {
    orientation: 'left',
};

export const right = Template.bind({});
right.args = {
    orientation: 'right',
};

export const top = Template.bind({});
top.args = {
    orientation: 'top',
};

export const topLeft = Template.bind({});
topLeft.args = {
    orientation: 'topLeft',
};

export const topRight = Template.bind({});
topRight.args = {
    orientation: 'topRight',
};
