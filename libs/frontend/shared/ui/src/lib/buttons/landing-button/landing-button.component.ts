/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'poker-moons-landing-button',
    templateUrl: './landing-button.component.html',
    styleUrls: ['./landing-button.component.scss'],
})
export class LandingButtonComponent implements OnInit {
    @Input() label?: string;
    @Input() startIcon?: IconProp;
    @Input() endIcon?: IconProp;
    @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    click(): void {
        return this.handleClick.emit();
    }
}
