import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'poker-moons-slider-input',
    templateUrl: './slider-input.component.html',
    styleUrls: ['./slider-input.component.scss'],
})
export class SliderInputComponent implements AfterContentInit {
    /**
     * @description Reference to the raw `<input type='slider'.../>`
     */
    @ViewChild('slider') input!: ElementRef;

    /**
     * @description The minimum value of the slider range.
     */
    @Input() min!: number;

    /**
     * @description The maximum value of the slider range.
     */
    @Input() max!: number;

    /**
     * @description The form control to be updated when the slider changes values.
     */
    @Input() control!: FormControl<number>;

    /**
     * @description The control.value that will ensure the component will update if the form is shared among multiple inputs.
     */
    @Input() value!: number;

    ngAfterContentInit(): void {
        this.control.valueChanges.subscribe((value) => {
            const element = this.input.nativeElement;

            const style = getComputedStyle(element);

            element.style.background = this.updateLinearGradient(style.background, value);
        });
    }

    /**
     * @description Updates the current `style.background`'s linear gradient to fit the current value.
     *
     * @param background
     * @param value
     */
    private updateLinearGradient(background: string, value: number): string {
        const percentage = Math.round(((value - this.min) / (this.max - this.min)) * 100);

        const update = background.replace(/[0-9]+?%/g, `${percentage}%`);

        return update;
    }
}
