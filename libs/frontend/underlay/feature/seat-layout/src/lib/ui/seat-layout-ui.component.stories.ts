import { mockPublicPlayer } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { of } from 'rxjs';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';
import { seatLayoutUiImports } from './seat-layout-ui.module';

export default {
    title: 'SeatLayoutUiComponent',
    component: SeatLayoutUiComponent,
    decorators: [
        moduleMetadata({
            imports: [...seatLayoutUiImports],
        }),
    ],
} as Meta<SeatLayoutUiComponent>;

const Template: Story<SeatLayoutUiComponent> = (args: SeatLayoutUiComponent) => ({
    component: SeatLayoutUiComponent,
    props: args,
});

export const Primary = Template.bind({});
const { id, username, img, seatId, stack, status, called } = mockPublicPlayer();
Primary.args = {
    seatMap: { 0: 'player_1', 1: 'player_2', 2: 'player_3', 3: 'player_4', 4: 'player_5', 5: 'player_6' },
    immutablePlayerMap$: of({
        player_1: { id, username, img, seatId },
    }),
    mutablePlayerMap$: of({
        player_1: { id, stack, status, called },
    }),
};
