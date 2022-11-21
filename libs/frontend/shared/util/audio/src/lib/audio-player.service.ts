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
    private _volume = 1;

    /**
     * @description Stores the active effects so that they can be paused.
     */
    private effectInstance: Partial<Record<AudioPlayerEffect, HTMLAudioElement>> = {};

    constructor(@Inject(NG_ENVIRONMENT) private readonly environment: NgEnvironment) {}

    set volume(level: number) {
        this._volume = level;
    }

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
}
