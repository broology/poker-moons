import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AudioPlayerService } from '@poker-moons/frontend/shared/util/audio';

@Component({
    selector: 'poker-moons-sound-feature',
    templateUrl: './sound-feature.component.html',
    styleUrls: ['./sound-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoundFeatureComponent {
    constructor(private readonly audioPlayerService: AudioPlayerService) {}

    get muted(): boolean {
        return this.audioPlayerService.muted;
    }

    get volume(): number {
        return this.audioPlayerService.volume;
    }

    /**
     * @description Toggles mute on the audio player.
     */
    toggleMute(): void {
        this.audioPlayerService.muted = !this.audioPlayerService.muted;
    }

    /**
     * @description Updates the volume level of the audio player.
     *
     * @param level - 0 = silent, 1 = loud as possible.
     */
    updateVolume(level: number) {
        this.audioPlayerService.volume = level;
    }
}
