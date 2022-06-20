/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'poker-moons-moon-timer',
    templateUrl: './moon-timer.component.html',
    styleUrls: ['./moon-timer.component.scss'],
})
export class MoonTimerComponent implements OnInit {
    @Input() duration: number;
    @Input() currentTime: number;
    @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.duration = 60;
        this.currentTime = this.duration;
    }

    ngOnInit(): void {}

    click(): void {
        return this.handleClick.emit();
    }
}
