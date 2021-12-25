import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChipsComponent } from './chips.component';

export default {
    title: 'ChipsComponent',
    component: ChipsComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<ChipsComponent>;

const Template: Story<ChipsComponent> = (args: ChipsComponent) => ({
    component: ChipsComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    amount: 100,
};
