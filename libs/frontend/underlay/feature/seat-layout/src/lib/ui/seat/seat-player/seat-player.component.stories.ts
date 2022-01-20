import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SeatPlayerComponent } from './seat-player.component';

export default {
    title: 'SeatPlayerComponent',
    component: SeatPlayerComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<SeatPlayerComponent>;

const Template: Story<SeatPlayerComponent> = (args: SeatPlayerComponent) => ({
    component: SeatPlayerComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
