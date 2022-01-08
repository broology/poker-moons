import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PotComponent } from './pot.component';
import { potModuleImports } from './pot.module';

export default {
    title: 'PotComponent',
    component: PotComponent,
    decorators: [
        moduleMetadata({
            imports: potModuleImports,
        }),
    ],
} as Meta<PotComponent>;

const Template: Story<PotComponent> = (args: PotComponent) => ({
    component: PotComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    mainPot: 0,
};
