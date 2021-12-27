import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommunityCardsComponent } from './community-cards.component';
import { communityCardsModuleImports } from './community-cards.module';

export default {
    title: 'CommunityCardsComponent',
    component: CommunityCardsComponent,
    decorators: [
        moduleMetadata({
            imports: communityCardsModuleImports,
        }),
    ],
} as Meta<CommunityCardsComponent>;

const Template: Story<CommunityCardsComponent> = (args: CommunityCardsComponent) => ({
    component: CommunityCardsComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    cards: [{ suit: 'clubs', rank: '01' }],
};
