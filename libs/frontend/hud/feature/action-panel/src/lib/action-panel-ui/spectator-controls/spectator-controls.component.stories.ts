import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SpectatorControlsComponent } from './spectator-controls.component';
import { spectatorControlsImports } from './spectator-controls.module';

export default {
    title: 'SpectatorControlsComponent',
    component: SpectatorControlsComponent,
    decorators: [
        moduleMetadata({
            imports: spectatorControlsImports,
        }),
    ],
    argTypes: {
        joinTableEmitter: { action: 'Join Table' },
    },
} as Meta<SpectatorControlsComponent>;

const Template: Story<SpectatorControlsComponent> = (args: SpectatorControlsComponent) => ({
    component: SpectatorControlsComponent,
    props: args,
});

export const notStarted = Template.bind({});
notStarted.args = {
    tableStatus: 'lobby',
};

export const started = Template.bind({});
started.args = {
    tableStatus: 'in-progress',
};
