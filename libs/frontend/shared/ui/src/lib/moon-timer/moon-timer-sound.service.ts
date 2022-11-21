import { Injectable } from '@angular/core';
import { AudioPlayerService } from '@poker-moons/frontend/shared/util/audio';

/**
 * @description Service responsible playing timer sound when timer is close to ending.
 */
@Injectable({ providedIn: 'root' })
export class MoonTimerSoundService {
    private MS_START_VALUE = 29000;

    private playing = false;

    constructor(private readonly audioPlayerService: AudioPlayerService) {}

    /**
     * @description Updates the ms remaining in the active timer.
     *
     * When timer reaches value at or under {@link MS_START_VALUE}, then it will start the timer music.
     *
     * The timer will end when the remaining ms is set to null, or the timer reaches zero.
     *
     * @param msRemaining - Milliseconds remaining in the timer.
     */
    update(msRemaining: number | null): void {
        if (msRemaining == null) {
            this.playing = false;
            this.audioPlayerService.stop('timingOut');
            return;
        }

        if (msRemaining <= 100) {
            this.playing = false;
            this.audioPlayerService.stop('timingOut');
            this.audioPlayerService.play('timerEnd');
            return;
        }

        if (msRemaining <= this.MS_START_VALUE && !this.playing) {
            this.playing = true;
            this.audioPlayerService.play('timingOut');
            return;
        }
    }
}
