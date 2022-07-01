import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChipsComponent } from './chips.component';
import { chipsModuleImports } from './chips.module';

export default {
    title: 'Chips/Component',
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

export const optimal = Template.bind({});
optimal.args = {
    optimal: true,
    amount: 5000,
};

export const unOptimal = Template.bind({});
unOptimal.args = {
    optimal: false,
    amount: 5000,
};
