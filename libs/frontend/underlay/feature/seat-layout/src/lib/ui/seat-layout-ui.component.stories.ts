import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';

export default {
    title: 'SeatLayoutUiComponent',
    component: SeatLayoutUiComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<SeatLayoutUiComponent>;

const Template: Story<SeatLayoutUiComponent> = (args: SeatLayoutUiComponent) => ({
    component: SeatLayoutUiComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
