import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'poker-moons-dollar-input',
    templateUrl: './dollar-input.component.html',
    styleUrls: ['./dollar-input.component.scss'],
})
export class DollarInputComponent {
    /**
     * @description Place holder displayed.
     */
    @Input() placeholder!: number;

    /**
     * @description The Form control to be updated.
     */
    @Input() control!: FormControl<number>;

    /**
     * @description Maximum number allowed.
     */
    @Input() min = Number.MIN_SAFE_INTEGER;

    /**
     * @description Minimum number allowed.
     */
    @Input() max = Number.MAX_SAFE_INTEGER;

    /**
     * @description The control.value that will ensure the component will update if the form is shared among multiple inputs.
     */
    @Input() value!: number;
}
