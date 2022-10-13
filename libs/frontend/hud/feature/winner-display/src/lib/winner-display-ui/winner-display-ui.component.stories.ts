import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
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

export const closed = Template.bind({});
closed.args = {
    open: false,
    title: 'Title',
    message: 'Message',
};

export const open = Template.bind({});
open.args = {
    open: true,
    title: 'Title',
    message: 'Message',
};
