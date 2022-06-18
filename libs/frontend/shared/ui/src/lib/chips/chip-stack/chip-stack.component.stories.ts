import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { chipDenominations, MAX_CHIPS_PER_STACK } from '../chip.type';
import { ChipStackComponent } from './chip-stack.component';
import { chipStackImports } from './chip-stack.module';

export default {
    title: 'Chips/Individual Stack',
    component: ChipStackComponent,
    decorators: [
        moduleMetadata({
            imports: chipStackImports,
            providers: [MockNgEnvironment],
        }),
        componentWrapperDecorator((story) => `<div style="margin-top: 8em;">${story}</div>`),
    ],
    argTypes: {
        denomination: { type: { name: 'enum', value: [...chipDenominations] }, defaultValue: 1 },
        count: {
            type: { name: 'enum', value: new Array(MAX_CHIPS_PER_STACK).fill(0).map((_, idx) => idx + 1) },
            defaultValue: 5,
        },
    },
} as Meta<ChipStackComponent>;

const Template: Story<ChipStackComponent> = (args: ChipStackComponent) => ({
    component: ChipStackComponent,
    props: args,
});

export const Primary = Template.bind({});
