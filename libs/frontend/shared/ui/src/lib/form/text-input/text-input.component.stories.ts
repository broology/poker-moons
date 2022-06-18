import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TextInputComponent } from './text-input.component';
import { textInputImports } from './text-input.module';

export default {
    title: 'Form/Text Input',
    component: TextInputComponent,
    decorators: [
        moduleMetadata({
            imports: textInputImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<TextInputComponent>;

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
    component: TextInputComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    placeholder: 'Username',
};
