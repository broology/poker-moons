import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { addSeconds } from 'date-fns';
import { LobbyControlsComponent } from './lobby-controls.component';
import { lobbyControlsImports } from './lobby-controls.module';

export default {
    title: 'Lobby Controls/Component',
    component: LobbyControlsComponent,
    decorators: [
        moduleMetadata({
            imports: lobbyControlsImports,
        }),
    ],
    argTypes: {
        toggleReadyStatusEmitter: { action: 'Toggle Ready Status' },
    },
} as Meta<LobbyControlsComponent>;

const Template: Story<LobbyControlsComponent> = (args: LobbyControlsComponent) => ({
    component: LobbyControlsComponent,
    props: args,
});

export const unReady = Template.bind({});
unReady.args = {
    ready: false,
};

export const ready = Template.bind({});
ready.args = {
    ready: true,
};

export const allPlayersReady = Template.bind({});
allPlayersReady.args = {
    ready: true,
    startDate: addSeconds(new Date(), 10),
};
