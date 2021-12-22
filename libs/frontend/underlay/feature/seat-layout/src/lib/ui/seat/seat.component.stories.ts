import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SeatComponent } from './seat.component';

export default {
    title: 'SeatComponent',
    component: SeatComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<SeatComponent>;

const Template: Story<SeatComponent> = (args: SeatComponent) => ({
    component: SeatComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
