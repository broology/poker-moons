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
    called: 0,
    toCall: 100,
    stack: 200,
};

export const checkCase = Template.bind({});
checkCase.args = {
    called: 100,
    toCall: 100,
    stack: 200,
};

export const callCase = Template.bind({});
callCase.args = {
    called: 0,
    toCall: 100,
    stack: 200,
};

export const onlyAllInCase = Template.bind({});
onlyAllInCase.args = {
    called: 0,
    toCall: 100,
    stack: 50,
};
