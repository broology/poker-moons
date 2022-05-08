/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { ButtonColors, ButtonVariant } from './button.type';

@Component({
    selector: 'poker-moons-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    @Input() variant?: ButtonVariant;
    @Input() color?: ButtonColors;

    constructor() {
        this.variant = 'primary';
        this.color = 'primary';
    }

    ngOnInit(): void {}

    getVariantClass() {
        return this.variant === 'secondary' ? 'variant-secondary' : 'variant-primary';
    }

    getColorClass() {
        return this.color;
    }
}
