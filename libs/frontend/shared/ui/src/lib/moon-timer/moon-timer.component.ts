/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface Time {
    total: number;
    min: string;
    sec: string;
}

@Component({
    selector: 'poker-moons-moon-timer',
    templateUrl: './moon-timer.component.html',
    styleUrls: ['./moon-timer.component.scss'],
})
export class MoonTimerComponent implements OnInit {
    @Input() width = '100%';
    @Input() height = '100%';
    @Input() duration = 30000;
    private currentTime: number;
    public currentTime$: Observable<Time>;
    @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.currentTime = 0;
        this.currentTime$ = interval(1000).pipe(
            map(() => this.getTime()),
            shareReplay(1),
        );
    }

    ngOnInit(): void {
        this.currentTime = this.duration;
        this.currentTime$.pipe().subscribe((val) => (this.currentTime = val.total - 1000));
    }

    getTime(): Time {
        if (this.currentTime <= 0) {
            return { total: 0, min: '00', sec: '00' };
        }

        const min = Math.floor((this.currentTime / 1000 / 60) % 60);
        const sec = Math.floor((this.currentTime / 1000) % 60);

        return {
            total: this.currentTime,
            min: min.toString().padStart(2, '0'),
            sec: sec.toString().padStart(2, '0'),
        };
    }
    getPath(): string {
        const toSubtract = ((this.duration - this.currentTime) / this.duration) * 130;

        return `M50,100 C${115 - toSubtract},100 ${115 - toSubtract},0 50,0 C-15,0 -15,100 50,100`;
    }
    getColorClass(): string {
        const ratio = this.currentTime / this.duration;
        return ratio > 0.5 ? 'moon' : ratio > 0.25 ? 'lunar-eclipse' : 'solar-eclipse';
    }

    click(): void {
        return this.handleClick.emit();
    }
}
