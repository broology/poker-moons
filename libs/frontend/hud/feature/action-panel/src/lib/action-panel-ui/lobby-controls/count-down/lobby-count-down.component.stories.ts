import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { addSeconds } from 'date-fns';
import { LobbyCountDownComponent } from './lobby-count-down.component';
import { lobbyCountDownImports } from './lobby-count-down.module';

export default {
    title: 'Lobby Controls/Count Down',
    component: LobbyCountDownComponent,
    decorators: [
        moduleMetadata({
            imports: lobbyCountDownImports,
        }),
    ],
    argTypes: {
        toggleReadyStatusEmitter: { action: 'Toggle Ready Status' },
    },
} as Meta<LobbyCountDownComponent>;

const Template: Story<LobbyCountDownComponent> = (args: LobbyCountDownComponent) => ({
    component: LobbyCountDownComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    startDate: addSeconds(new Date(), 10),
};
