import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { mockCard } from '@poker-moons/shared/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CardComponent } from './card.component';
import { cardImports } from './card.module';

export default {
    title: 'CardComponent',
    component: CardComponent,
    decorators: [
        moduleMetadata({
            imports: cardImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<CardComponent>;

const Template: Story<CardComponent> = (args: CardComponent) => ({
    component: CardComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    card: mockCard(),
};

export const face = Template.bind({});
face.args = {
    card: mockCard(),
};

export const back = Template.bind({});
back.args = {
    card: null,
};

export const none = Template.bind({});
none.args = {
    card: undefined,
};
