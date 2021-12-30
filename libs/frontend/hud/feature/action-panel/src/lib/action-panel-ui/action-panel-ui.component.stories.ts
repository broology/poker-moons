import { mockImmutablePublicPlayer, mockMutablePublicPlayer, mockRound } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ActionPanelUiComponent } from './action-panel-ui.component';
import { actionPanelUiImports } from './action-panel-ui.module';

export default {
    title: 'ActionPanelUiComponent',
    component: ActionPanelUiComponent,
    decorators: [
        moduleMetadata({
            imports: actionPanelUiImports,
        }),
    ],
    argTypes: {
        displayView: {
            description: 'Dynamic value generated from the information given to see what state the display should be',
        },
        joinTableEmitter: { action: 'Join Table' },
        leaveTableEmitter: { action: 'Leave Table' },
        playerActionEmitter: { action: 'Player Action' },
    },
} as Meta<ActionPanelUiComponent>;

const Template: Story<ActionPanelUiComponent> = (args: ActionPanelUiComponent) => ({
    component: ActionPanelUiComponent,
    props: args,
});

const defaultArgs = {
    clientImmutablePlayer: mockImmutablePublicPlayer({ seatId: 0 }),
    clientMutablePlayer: mockMutablePublicPlayer({ stack: 1000, called: 0 }),
    round: mockRound({ activeSeat: 0, toCall: 100 }),
};

export const primary = Template.bind({});
primary.args = defaultArgs;

export const active = Template.bind({});
active.args = defaultArgs;

export const inActive = Template.bind({});
inActive.args = {
    ...defaultArgs,
    round: mockRound({ activeSeat: 1 }),
};

export const spectator = Template.bind({});
spectator.args = {
    ...defaultArgs,
    clientImmutablePlayer: null,
    clientMutablePlayer: null,
};
