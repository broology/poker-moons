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
    currentTime: number;
    displayTime: string;
    @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.duration = 20000;
        this.currentTime = this.duration;
        this.displayTime = this.getDisplayTime(this.currentTime);
    }

    ngOnInit(): void {
        this.start();
    }

    getDisplayTime(time: number): string {
        const min = Math.floor((time / 1000 / 60) % 60);
        const sec = Math.floor((time / 1000) % 60);

        return [min.toString().padStart(2, '0'), sec.toString().padStart(2, '0')].join(':');
    }

    getPath(): string {
        const toSubtract = ((this.duration - this.currentTime) / this.duration) * 130;

        return `M50,100 C${115 - toSubtract},100 ${115 - toSubtract},0 50,0 C-15,0 -15,100 50,100`;
    }

    start(): void {
        setInterval(() => {
            if (this.currentTime > 0) {
                const time = this.currentTime - 1000;
                this.currentTime = time;
                this.displayTime = this.getDisplayTime(time);
            } else {
                clearInterval();
            }
        }, 1000);
    }

    getColorClass(): string {
        const ratio = this.currentTime / this.duration;
        return ratio > 0.5 ? 'success' : ratio > 0.25 ? 'warning' : 'error';
    }

    click(): void {
        return this.handleClick.emit();
    }
}
