import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChipsComponent } from './chips.component';
import { chipsModuleImports } from './chips.module';

export default {
    title: 'ChipsComponent',
    component: ChipsComponent,
    decorators: [
        moduleMetadata({
            imports: chipsModuleImports,
            providers: [MockNgEnvironment],
        }),
        componentWrapperDecorator((story) => `<div style="margin-top: 8em">${story}</div>`),
    ],
} as Meta<ChipsComponent>;

const Template: Story<ChipsComponent> = (args: ChipsComponent) => ({
    component: ChipsComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    amount: 500000,
};
