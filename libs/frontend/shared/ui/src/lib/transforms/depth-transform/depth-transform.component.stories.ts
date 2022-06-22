import { Component, Input } from '@angular/core';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Card } from '@poker-moons/shared/type';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CardModule } from '../../card';
import { DepthLevel } from '../../shared/type';
import { CardOrientationTransformModule } from '../card-orientation-transform';
import { DepthTransformModule } from './depth-transform.module';

/**
 * This story is to display all versions of depth on a card
 */
@Component({
    selector: 'poker-moons-depth-transform-test',
    template: `
        <div style="margin: 5em;">
            <poker-moons-depth-transform [depth]="depth">
                <poker-moons-card-orientation-transform orientation="topRight">
                    <poker-moons-card [card]="card"></poker-moons-card>
                </poker-moons-card-orientation-transform>
            </poker-moons-depth-transform>
        </div>
    `,
})
class DepthTransformTestComponent {
    @Input() depth!: DepthLevel;

    card: Card = {
        suit: 'clubs',
        rank: '2',
    };
}

export default {
    title: 'Card/Depth Transform',
    component: DepthTransformTestComponent,
    decorators: [
        moduleMetadata({
            imports: [DepthTransformModule, CardOrientationTransformModule, CardModule],
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<DepthTransformTestComponent>;

const Template: Story<DepthTransformTestComponent> = (args: DepthTransformTestComponent) => ({
    component: DepthTransformTestComponent,
    props: args,
});

export const _1front = Template.bind({});
_1front.args = {
    depth: 0,
};

export const _2frontMiddle = Template.bind({});
_2frontMiddle.args = {
    depth: 1,
};
export const _2backMiddle = Template.bind({});
_2backMiddle.args = {
    depth: 2,
};

export const _3back = Template.bind({});
_3back.args = {
    depth: 3,
};
