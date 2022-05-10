/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ButtonColors, ButtonVariant } from './primary-button.type';

@Component({
    selector: 'poker-moons-primary-button',
    templateUrl: './primary-button.component.html',
    styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
    @Input() label?: string;
    @Input() variant?: ButtonVariant;
    @Input() color?: ButtonColors;
    @Input() startIcon?: IconProp;
    @Input() endIcon?: IconProp;

    faCoffee = faCoffee;

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
