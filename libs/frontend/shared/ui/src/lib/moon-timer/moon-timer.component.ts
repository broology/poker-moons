/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import { MoonTimerSoundService } from './moon-timer-sound.service';

interface Time {
    total: number;
    min: string;
    sec: string;
}

@Component({
    selector: 'poker-moons-moon-timer',
    templateUrl: './moon-timer.component.html',
    styleUrls: ['./moon-timer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoonTimerComponent implements OnInit {
    /**
     * @description The duration to have the timer run for in milliseconds.
     *
     * If `null` is past in then the timer is stopped.
     */
    @Input() set duration(duration: number | null) {
        this.running = duration !== null;
        this._duration = duration ?? 2000;
        this.currentTime = duration ?? 2000;
        this.soundService.update(duration);
    }

    private _duration = 2000;
    private currentTime = 2000;
    public running = false;
    public displayTime$: Observable<Time>;

    constructor(private readonly soundService: MoonTimerSoundService) {
        this.displayTime$ = interval(1000).pipe(
            shareReplay(1),
            startWith(this.getTime()),
            map(() => this.getTime()),
            filter(() => !this.running || this.currentTime >= 1000),
        );
    }

    ngOnInit(): void {
        this.currentTime = this._duration;
        this.displayTime$.pipe().subscribe((val) => {
            if (this.running) {
                this.currentTime = val.total - 1000;
                this.soundService.update(this.currentTime);
            }
        });
    }

    getTime(): Time {
        const min = Math.floor((this.currentTime / 1000 / 60) % 60);
        const sec = Math.floor((this.currentTime / 1000) % 60);

        return {
            total: this.currentTime,
            min: min.toString().padStart(2, '0'),
            sec: sec.toString().padStart(2, '0'),
        };
    }

    getPath(): string {
        const toSubtract = ((this._duration - this.currentTime) / this._duration) * 130;

        return `M50,100 C${115 - toSubtract},100 ${115 - toSubtract},0 50,0 C-15,0 -15,100 50,100`;
    }

    getColorClass(): string {
        const ratio = this.currentTime / this._duration;
        return ratio > 0.5 ? 'moon' : ratio > 0.25 ? 'lunar-eclipse' : 'solar-eclipse';
    }
}
