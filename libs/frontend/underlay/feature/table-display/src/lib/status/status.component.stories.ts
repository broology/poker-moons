import { RoundStatus, roundStatus } from '@poker-moons/shared/type';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { StatusComponent } from './status.component';
import { statusModuleImports } from './status.module';

export default {
    title: 'StatusComponent',
    component: StatusComponent,
    decorators: [
        moduleMetadata({
            imports: statusModuleImports,
        }),
    ],
} as Meta<StatusComponent>;

const Template: Story<StatusComponent> = (args: StatusComponent) => ({
    component: StatusComponent,
    props: args,
});

const { deal, turn, river, flop } = roundStatus.reduce((prev, status) => {
    const template = Template.bind({});
    template.args = { status };

    return { ...prev, [status]: template };
}, {}) as Record<RoundStatus, Story<StatusComponent>>;

export { deal, turn, river, flop };
