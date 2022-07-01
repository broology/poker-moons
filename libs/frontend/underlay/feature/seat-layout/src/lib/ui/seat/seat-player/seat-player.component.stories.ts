import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { mockImmutablePublicPlayer, mockMutablePublicPlayer } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SeatPlayerComponent } from './seat-player.component';
import { seatPlayerImports } from './seat-player.module';

export default {
    title: 'SeatPlayerComponent',
    component: SeatPlayerComponent,
    decorators: [
        moduleMetadata({
            imports: seatPlayerImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<SeatPlayerComponent>;

const Template: Story<SeatPlayerComponent> = (args: SeatPlayerComponent) => ({
    component: SeatPlayerComponent,
    props: args,
});

export const active = Template.bind({});
active.args = {
    immutablePlayer: mockImmutablePublicPlayer({
        username: 'Dylan',
        seatId: 0,
    }),
    mutablePlayer: mockMutablePublicPlayer(),
    active: true,
};

export const occupied = Template.bind({});
occupied.args = {
    immutablePlayer: mockImmutablePublicPlayer({
        username: 'Dylan',
    }),
    mutablePlayer: mockMutablePublicPlayer(),
};

export const empty = Template.bind({});
empty.args = {
    immutablePlayer: undefined,
};
