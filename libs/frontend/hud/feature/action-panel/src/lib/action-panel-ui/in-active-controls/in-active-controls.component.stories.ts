import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { InActiveControlsComponent } from './in-active-controls.component';
import { inActiveControlsImports } from './in-active-controls.module';

export default {
    title: 'Inactive Controls/Component',
    component: InActiveControlsComponent,
    decorators: [
        moduleMetadata({
            imports: inActiveControlsImports,
        }),
    ],
} as Meta<InActiveControlsComponent>;

const Template: Story<InActiveControlsComponent> = (args: InActiveControlsComponent) => ({
    component: InActiveControlsComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
