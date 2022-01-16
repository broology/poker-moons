import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
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
