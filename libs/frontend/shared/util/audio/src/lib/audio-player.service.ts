import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';

/**
 * @description List of audio player effects that can be played. List of key value pairs where the value is the
 * path in the assets bucket.
 */
const audioPlayerEffects = {
    shuffle: '/audio/shuffle.wav',
    flop: '/audio/flop.wav',
    cardFlip: '/audio/card-flip.wav',
    clientTurn: '/audio/client-turn.wav',
    timerEnd: '/audio/timer-end.wav',
    timingOut: '/audio/timing-out.wav',
    check: '/audio/check.wav',
    fold: '/audio/fold.wav',
    stackMove: '/audio/stack-move.wav',
    loseRound: '/audio/lose-round.wav',
    winRound: '/audio/win-round.wav',
    gameFinished: '/audio/game-finished.wav',
} as const;

type AudioPlayerEffect = keyof typeof audioPlayerEffects;

/**
 * @description Service responsible playing audio on the client.
 */
@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
    private _muted = false;
    private _volume = 1;

    /**
     * @description Stores the active effects so that they can be paused.
     */
    private effectInstance: Partial<Record<AudioPlayerEffect, HTMLAudioElement>> = {};

    get muted(): boolean {
        return this._muted;
    }

    /**
     * @description When audio is muted updates the variable and sets all active instances volume to zero.
     */
    set muted(value: boolean) {
        this._muted = value;

        const volume = value ? 0 : this._volume;
        this.updateAllInstancesVolume(volume);
    }

    get volume(): number {
        return this._volume;
    }

    /**
     * @description When the volume is changed updates the variable and update all the active instances volume.
     */
    set volume(level: number) {
        this._volume = level;

        this.updateAllInstancesVolume(level);
    }

    constructor(@Inject(NG_ENVIRONMENT) private readonly environment: NgEnvironment) {}

    /**
     * @description Plays the effect.
     *
     * @param effect - The effect to be played.
     */
    play(effect: AudioPlayerEffect): void {
        const instance = new Audio(`${this.environment.assets}${audioPlayerEffects[effect]}`);

        instance.volume = this._volume;
        instance.play();

        this.effectInstance[effect] = instance;
    }

    /**
     * @description Attempts to stop the supplied affect. If not found does nothing.
     *
     * @param effect - The effect to be stopped.
     */
    stop(effect: AudioPlayerEffect): void {
        const instance = this.effectInstance[effect];

        if (instance) {
            instance.pause();
        }
    }

    /**
     * @description Updates each of the currently active sound effect instances with the volume level.
     *
     * This may be called when the volume is changed during active sounds.
     */
    private updateAllInstancesVolume(level: number) {
        for (const instance of Object.values(this.effectInstance)) {
            if (instance) {
                instance.volume = level;
            }
        }
    }
}
