import { Component, Input } from '@angular/core';

@Component({
    selector: 'poker-moons-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() placeholder!: string;

    @Input() formControlName!: string;
}
