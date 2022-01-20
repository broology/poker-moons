import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChipStackComponent } from './chip-stack.component';
import { chipStackImports } from './chip-stack.module';

export default {
    title: 'ChipStackComponent',
    component: ChipStackComponent,
    decorators: [
        moduleMetadata({
            imports: chipStackImports,
            providers: [MockNgEnvironment],
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
    chipAssetPath: '/chips/chip.png',
};