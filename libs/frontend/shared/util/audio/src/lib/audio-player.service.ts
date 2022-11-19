import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';

/**
 * @description List of audio player effects that can be played. List of key value pairs where the value is the
 * path in the assets bucket.
 */
const audioPlayerEffects = {
    cardFlip: '/audio/card-flip.wav',
    cardSlide: '/audio/card-slide.wav',
    flop: '/audio/flop.wav',
    shuffle: '/audio/shuffle.wav',
    stackMove: '/audio/stack-move.wav',
} as const;

type AudioPlayerEffect = keyof typeof audioPlayerEffects;

/**
 * @description Service responsible playing audio on the client.
 */
@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
    private _volume = 1;

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
    }
}
