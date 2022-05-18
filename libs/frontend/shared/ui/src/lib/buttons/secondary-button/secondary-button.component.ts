/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ButtonColors } from './secondary-button.type';

@Component({
    selector: 'poker-moons-secondary-button',
    templateUrl: './secondary-button.component.html',
    styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent implements OnInit {
    @Input() label?: string;
    @Input() color?: ButtonColors;
    @Input() startIcon?: IconProp;
    @Input() endIcon?: IconProp;

    faCoffee = faCoffee;

    constructor() {
        this.color = 'primary';
    }

    ngOnInit(): void {}

    getColorClass() {
        return this.color;
    }
}
