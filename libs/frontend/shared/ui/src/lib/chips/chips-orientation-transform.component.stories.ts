import { Component, Input } from '@angular/core';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChipsModule } from '.';
import { PlayerOrientation } from '../shared/type';

/**
 * This story is to display all versions of chip orientations
 */
@Component({
    selector: 'poker-moons-chips-orientation-transform-test',
    template: `
        <div>
            <div>
                <poker-moons-chips [amount]="1" [orientation]="orientation"></poker-moons-chips>
            </div>
            <div>
                <poker-moons-chips [amount]="6" [orientation]="orientation"></poker-moons-chips>
            </div>
            <div>
                <poker-moons-chips [amount]="99999" [orientation]="orientation"></poker-moons-chips>
            </div>
            <div>
                <poker-moons-chips [amount]="999999" [orientation]="orientation"></poker-moons-chips>
            </div>
        </div>
    `,
    styles: [
        `
            div > div {
                display: inline-block;
                background-color: black;
                margin: 5em;
            }
        `,
    ],
})
class ChipsOrientationTransformTestComponent {
    @Input() orientation!: PlayerOrientation;

    @Input() amount = 9997;
}

export default {
    title: 'ChipsOrientationTransformTestComponent',
    component: ChipsOrientationTransformTestComponent,
    decorators: [
        moduleMetadata({
            imports: [ChipsModule],
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<ChipsOrientationTransformTestComponent>;

const Template: Story<ChipsOrientationTransformTestComponent> = (args: ChipsOrientationTransformTestComponent) => ({
    component: ChipsOrientationTransformTestComponent,
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
