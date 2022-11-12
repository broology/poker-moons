import { FormControl } from '@angular/forms';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { SliderInputComponent } from './slider-input.component';
import { sliderInputImports } from './slider-input.module';

export default {
    title: 'Form/Slider Input',
    component: SliderInputComponent,
    decorators: [
        moduleMetadata({
            imports: sliderInputImports,
            providers: [MockNgEnvironment],
        }),
        componentWrapperDecorator((component) => `<div style="background-color: grey;">${component}</div>`),
    ],
} as Meta<SliderInputComponent>;

const Template: Story<SliderInputComponent> = (args: SliderInputComponent) => ({
    component: SliderInputComponent,
    props: args,
});

export const primary = Template.bind({});
primary.args = {
    min: 100,
    max: 500,
    control: new FormControl(),
};
