import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import { dialogImports } from './dialog.module';

export default {
    title: 'Dialog/Component',
    component: DialogComponent,
    decorators: [
        moduleMetadata({
            imports: dialogImports,
            providers: [MockNgEnvironment],
        }),
    ],
    argTypes: {
        primary: {
            action: 'Primary Action',
        },
        secondary: {
            action: 'Secondary Action',
        },
    },
} as Meta<DialogComponent>;

const Template: Story<DialogComponent> = (args: DialogComponent) => ({
    component: DialogComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    copy: {
        title: 'Sample Dialog',
        subtitle: 'This is a sample dialog.',
        secondaryButton: 'SECONDARY',
        primaryButton: 'PRIMARY',
    },
};

export const withoutSubtitle = Template.bind({});
withoutSubtitle.args = {
    copy: {
        title: 'Sample Dialog',
        secondaryButton: 'SECONDARY',
        primaryButton: 'PRIMARY',
    },
};

export const withoutSecondary = Template.bind({});
withoutSecondary.args = {
    copy: {
        title: 'Sample Dialog',
        primaryButton: 'PRIMARY',
    },
};

export const withoutPrimary = Template.bind({});
withoutPrimary.args = {
    copy: {
        title: 'Sample Dialog',
        secondaryButton: 'SECONDARY',
    },
};
