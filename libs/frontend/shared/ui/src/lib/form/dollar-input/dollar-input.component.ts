import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'poker-moons-dollar-input',
    templateUrl: './dollar-input.component.html',
    styleUrls: ['./dollar-input.component.scss'],
})
export class DollarInputComponent {
    @Input() placeholder!: string;

    @Input() control!: FormControl;
}
