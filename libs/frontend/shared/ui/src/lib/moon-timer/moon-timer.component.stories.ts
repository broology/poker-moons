import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { MoonTimerComponent } from './moon-timer.component';
import { moonTimerModuleImports } from './moon-timer.module';

export default {
    title: 'MoonTimer/Component',
    component: MoonTimerComponent,
    decorators: [
        moduleMetadata({
            imports: moonTimerModuleImports,
            providers: [MockNgEnvironment],
        }),
        componentWrapperDecorator((story) => `<div style="padding: 8em; background-color: black;">${story}</div>`),
    ],
    argTypes: {
        duration: {
            control: { type: 'radio' },
            options: [null, 30000, 300000],
        },
    },
} as Meta<MoonTimerComponent>;

const Template: Story<MoonTimerComponent> = (args: MoonTimerComponent) => ({
    component: MoonTimerComponent,
    props: args,
});

export const running = Template.bind({});
running.args = {
    duration: 30000,
};

export const stopped = Template.bind({});
stopped.args = {
    duration: null,
};
