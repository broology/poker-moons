import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { TextInputModule } from '../text-input';
import { ErrorLabelComponent } from './error-label.component';
import { errorLabelImports } from './error-label.module';

export default {
    title: 'Form/Error Label',
    component: ErrorLabelComponent,
    decorators: [
        moduleMetadata({
            imports: [...errorLabelImports, TextInputModule],
        }),
        componentWrapperDecorator(
            (story) =>
                `<div style="margin-top: 4em"><poker-moons-text-input placeholder="Username"></poker-moons-text-input>${story}</div>`,
        ),
    ],
} as Meta<ErrorLabelComponent>;

const Template: Story<ErrorLabelComponent> = (args: ErrorLabelComponent) => ({
    component: ErrorLabelComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    error: 'Username must be at least 3 characters long',
};
