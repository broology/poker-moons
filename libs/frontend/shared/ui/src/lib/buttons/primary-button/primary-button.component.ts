/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ButtonColors } from './primary-button.type';

@Component({
    selector: 'poker-moons-primary-button',
    templateUrl: './primary-button.component.html',
    styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
    @Input() label?: string;
    @Input() color?: ButtonColors;
    @Input() startIcon?: IconProp;
    @Input() endIcon?: IconProp;
    @Output() handleClick = new EventEmitter();

    constructor() {
        this.color = 'primary';
    }

    ngOnInit(): void {}

    getColorClass() {
        return this.color;
    }
}
