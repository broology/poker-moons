import { Component, Input } from '@angular/core';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Card } from '@poker-moons/shared/type';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CardModule } from '../../card';
import { CardOrientationTransformModule } from '../card-orientation-transform';
import { DepthLevel } from './depth-transform.component';
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
    title: 'DepthTransformTestComponent',
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
    depth: 'front',
};

export const _2middle = Template.bind({});
_2middle.args = {
    depth: 'middle',
};

export const _3back = Template.bind({});
_3back.args = {
    depth: 'back',
};
