import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
    template: `
        <table>
            <tr>
                <th></th>
                <th *ngFor="let transform of transforms">{{ transform }}</th>
            </tr>
            <tr *ngFor="let colour of colours">
                <th>
                    {{ colour }}
                </th>
                <td
                    *ngFor="let transform of transforms"
                    [style]="'background: var(--' + colour + (transform === 'default' ? '' : '-' + transform) + ');'"
                >
                    <p [style]="'color: var(--' + colour + '-text-contrast);'">Text</p>
                </td>
            </tr>
        </table>
    `,
    styles: [
        `
            td {
                width: 75px;
                height: 50px;
                text-align: center;
            }
        `,
    ],
    styleUrls: ['../styles.scss'],
})
class ColorDisplayComponent {
    transforms = ['default', 'shaded', 'tinted', 'alpha-50', 'alpha-25'];
    colours = ['primary', 'secondary', 'foreground', 'background', 'success', 'warning', 'error'];
}

export default {
    title: 'ColourDisplayComponent',
    component: ColorDisplayComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<ColorDisplayComponent>;

const Template: Story<ColorDisplayComponent> = (args: ColorDisplayComponent) => ({
    component: ColorDisplayComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
