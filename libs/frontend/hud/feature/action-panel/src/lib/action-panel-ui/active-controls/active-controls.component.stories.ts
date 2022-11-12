import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ActiveControlsComponent } from './active-controls.component';
import { activeControlsImports } from './active-controls.module';

export default {
    title: 'Active Controls/Component',
    component: ActiveControlsComponent,
    decorators: [
        moduleMetadata({
            imports: activeControlsImports,
        }),
    ],
    argTypes: {
        playerActionEmitter: { action: 'Player Action' },
    },
} as Meta<ActiveControlsComponent>;

const Template: Story<ActiveControlsComponent> = (args: ActiveControlsComponent) => ({
    component: ActiveControlsComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    player: {
        biddingCycleCalled: 10,
        stack: 200,
    },
    round: {
        toCall: 100,
        smallBlind: 50,
    },
};

export const checkCase = Template.bind({});
checkCase.args = {
    round: {
        toCall: 100,
        smallBlind: 50,
    },
    player: {
        biddingCycleCalled: 100,
        stack: 200,
    },
};

export const callCase = Template.bind({});
callCase.args = {
    round: {
        toCall: 100,
        smallBlind: 50,
    },
    player: {
        biddingCycleCalled: 0,
        stack: 200,
    },
};

export const onlyAllInCase = Template.bind({});
onlyAllInCase.args = {
    round: {
        toCall: 100,
        smallBlind: 50,
    },
    player: {
        biddingCycleCalled: 0,
        stack: 50,
    },
};
