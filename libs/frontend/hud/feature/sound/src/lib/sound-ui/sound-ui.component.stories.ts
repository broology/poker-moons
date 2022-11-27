import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SoundUiComponent } from './sound-ui.component';
import { soundUiImports } from './sound-ui.module';

export default {
    title: 'SoundUiComponent',
    component: SoundUiComponent,
    decorators: [
        moduleMetadata({
            imports: soundUiImports,
            providers: [MockNgEnvironment],
        }),
    ],
} as Meta<SoundUiComponent>;

const Template: Story<SoundUiComponent> = (args: SoundUiComponent) => ({
    component: SoundUiComponent,
    props: args,
});

export const active = Template.bind({});
active.args = {
    muted: false,
    volume: 1,
};

export const muted = Template.bind({});
muted.args = {
    muted: true,
    volume: 1,
};
