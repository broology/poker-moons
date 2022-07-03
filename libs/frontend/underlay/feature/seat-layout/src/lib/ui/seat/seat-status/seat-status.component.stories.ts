import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { mockMutablePublicPlayer } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SeatStatusComponent } from './seat-status.component';
import { seatStatusImports } from './seat-status.module';

export default {
    title: 'Seat/Status Component',
    component: SeatStatusComponent,
    decorators: [
        moduleMetadata({
            imports: seatStatusImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<SeatStatusComponent>;

const Template: Story<SeatStatusComponent> = (args: SeatStatusComponent) => ({
    component: SeatStatusComponent,
    props: args,
});

export const empty = Template.bind({});
empty.args = {
    mutablePlayer: null,
    tableStatus: 'lobby',
};

export const loggyReady = Template.bind({});
loggyReady.args = {
    mutablePlayer: mockMutablePublicPlayer({ ready: true }),
    tableStatus: 'lobby',
};

export const lobbyNotReady = Template.bind({});
lobbyNotReady.args = {
    mutablePlayer: mockMutablePublicPlayer({ ready: false }),
    tableStatus: 'lobby',
};

export const activeOut = Template.bind({});
activeOut.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'out' }),
    tableStatus: 'in-progress',
};

export const activeWaiting = Template.bind({});
activeWaiting.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'waiting' }),
    tableStatus: 'in-progress',
};

export const activeChecked = Template.bind({});
activeChecked.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'checked' }),
    tableStatus: 'in-progress',
};

export const activeCalled = Template.bind({});
activeCalled.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'called', biddingCycleCalled: 1000 }),
    tableStatus: 'in-progress',
};

export const activeFolded = Template.bind({});
activeFolded.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'folded' }),
    tableStatus: 'in-progress',
};

export const activeRaised = Template.bind({});
activeRaised.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'raised', biddingCycleCalled: 1100 }),
    tableStatus: 'in-progress',
};

export const activeAllIn = Template.bind({});
activeAllIn.args = {
    mutablePlayer: mockMutablePublicPlayer({ status: 'all-in', biddingCycleCalled: 5000 }),
    tableStatus: 'in-progress',
};
