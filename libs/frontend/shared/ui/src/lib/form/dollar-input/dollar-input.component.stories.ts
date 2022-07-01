import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { DollarInputComponent } from './dollar-input.component';
import { dollarInputImports } from './dollar-input.module';

export default {
    title: 'Form/Dollar Input',
    component: DollarInputComponent,
    decorators: [
        moduleMetadata({
            imports: dollarInputImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<DollarInputComponent>;

const Template: Story<DollarInputComponent> = (args: DollarInputComponent) => ({
    component: DollarInputComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    placeholder: 500,
};
