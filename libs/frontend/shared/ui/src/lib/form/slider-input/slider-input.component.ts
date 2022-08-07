import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'poker-moons-slider-input',
    templateUrl: './slider-input.component.html',
    styleUrls: ['./slider-input.component.scss'],
})
export class SliderInputComponent {
    /**
     * @description The minimum value of the slider range
     */
    @Input() set min(min: number) {
        this.options.floor = min;
    }

    /**
     * @description The maximum value of the slider range
     */
    @Input() set max(max: number) {
        this.options.ceil = max;
    }

    /**
     * @description The value the slider will start at
     */
    @Input() set start(start: number) {
        this._value = start;
    }

    /**
     * @description The form control to be updated when the slider changes values
     */
    @Input() control!: FormControl;

    _value!: number;

    options: Options = {
        hideLimitLabels: true,
        hidePointerLabels: true,
        showSelectionBar: true,
    };

    manualRefresh = new EventEmitter();

    changed(value: number) {
        this.control.setValue(value);
        this.manualRefresh.emit();
    }
}
