import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { LandingButtonComponent } from './landing-button.component';
import { landingButtonModuleImports } from './landing-button.module';

export default {
    title: 'LandingButtonComponent',
    component: LandingButtonComponent,
    decorators: [
        moduleMetadata({
            imports: landingButtonModuleImports,
            providers: [MockNgEnvironment],
        }),
        componentWrapperDecorator((story) => `<div style="margin: 8em 0 0 10em">${story}</div>`),
    ],
} as Meta<LandingButtonComponent>;

const Template: Story<LandingButtonComponent> = (args: LandingButtonComponent) => ({
    component: LandingButtonComponent,
    props: args,
});

export const Primary = Template.bind({});
