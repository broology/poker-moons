import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FrontendBuilderFormUiComponent } from './frontend-builder-form-ui.component';
import { frontendBuilderFormUiImports } from './frontend-builder-form-ui.module';

export default {
    title: 'FrontendBuilderFormUiComponent',
    component: FrontendBuilderFormUiComponent,
    decorators: [
        moduleMetadata({
            imports: frontendBuilderFormUiImports,
        }),
    ],
    argTypes: {
        createTableEmitter: { action: 'Create Table' },
    },
} as Meta<FrontendBuilderFormUiComponent>;

const Template: Story<FrontendBuilderFormUiComponent> = (args: FrontendBuilderFormUiComponent) => ({
    component: FrontendBuilderFormUiComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    loading: false,
};
