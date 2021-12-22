import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';
import { seatLayoutUiImports } from './seat-layout-ui.module';

export default {
    title: 'SeatLayoutUiComponent',
    component: SeatLayoutUiComponent,
    decorators: [
        moduleMetadata({
            imports: [...seatLayoutUiImports],
        }),
    ],
} as Meta<SeatLayoutUiComponent>;

const Template: Story<SeatLayoutUiComponent> = (args: SeatLayoutUiComponent) => ({
    component: SeatLayoutUiComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
