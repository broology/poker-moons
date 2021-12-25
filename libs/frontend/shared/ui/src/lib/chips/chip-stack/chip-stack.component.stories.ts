import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChipStackComponent } from './chip-stack.component';

export default {
    title: 'ChipStackComponent',
    component: ChipStackComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<ChipStackComponent>;

const Template: Story<ChipStackComponent> = (args: ChipStackComponent) => ({
    component: ChipStackComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    count: 5,
    colour: '#FFFFFF',
};
