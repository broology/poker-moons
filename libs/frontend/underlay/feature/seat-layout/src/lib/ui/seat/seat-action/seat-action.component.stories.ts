import { moduleMetadata, Story, Meta } from '@storybook/angular';
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
Primary.args = {};
