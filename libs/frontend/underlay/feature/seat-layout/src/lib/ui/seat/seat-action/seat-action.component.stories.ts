import { mockMutablePublicPlayer } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SeatActionComponent } from './seat-action.component';

export default {
    title: 'SeatActionComponent',
    component: SeatActionComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<SeatActionComponent>;

const Template: Story<SeatActionComponent> = (args: SeatActionComponent) => ({
    component: SeatActionComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    mutablePlayer: mockMutablePublicPlayer(),
    playerOrientation: 'bottom',
    depthLevel: 0,
};
