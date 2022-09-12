import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { mockCard } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { WinnerDisplayUiComponent } from './winner-display-ui.component';
import { winnerDisplayUiImports } from './winner-display-ui.module';

export default {
    title: 'WinnerDisplayUiComponent',
    component: WinnerDisplayUiComponent,
    decorators: [
        moduleMetadata({
            imports: winnerDisplayUiImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<WinnerDisplayUiComponent>;

const Template: Story<WinnerDisplayUiComponent> = (args: WinnerDisplayUiComponent) => ({
    component: WinnerDisplayUiComponent,
    props: args,
});

export const noWinners = Template.bind({});
noWinners.args = {
    winners: {},
};

export const singleWinner = Template.bind({});
singleWinner.args = {
    winners: {
        ['player_1']: {
            displayText: 'Player 1 won $100 with a full house.',
            amountWon: 100,
            cards: [mockCard(), mockCard()],
        },
    },
};

export const multipleWinners = Template.bind({});
multipleWinners.args = {
    winners: {
        ['player_1']: {
            displayText: 'Player 1 won $50 with a pair.',
            amountWon: 50,
            cards: [mockCard(), mockCard()],
        },
        ['player_2']: {
            displayText: 'Player 2 won $50 with a pair.',
            amountWon: 50,
            cards: [mockCard(), mockCard()],
        },
    },
};
