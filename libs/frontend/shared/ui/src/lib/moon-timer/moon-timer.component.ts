/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'poker-moons-moon-timer',
    templateUrl: './moon-timer.component.html',
    styleUrls: ['./moon-timer.component.scss'],
})
export class MoonTimerComponent implements OnInit {
    @Input() label?: string;
    @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    click(): void {
        return this.handleClick.emit();
    }
}
