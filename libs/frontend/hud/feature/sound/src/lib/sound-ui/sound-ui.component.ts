import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'poker-moons-sound-ui',
    templateUrl: './sound-ui.component.html',
    styleUrls: ['./sound-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoundUiComponent implements OnInit {
    /**
     * @description Whether the audio is muted or not.
     */
    @Input() muted!: boolean;

    /**
     * @description The volume of the audio. (0 - 1).
     */
    @Input() volume!: number;

    /**
     * @description Event to toggle mute of the audio.
     */
    @Output() toggleMute = new EventEmitter<void>();

    /**
     * @description Event to update the volume of the audio.
     */
    @Output() updateVolume = new EventEmitter<number>();

    /**
     * @description Form control for the volume.
     */
    volumeControl!: FormControl<number>;

    volumeHighIcon = faVolumeHigh;
    volumeMutedIcon = faVolumeMute;

    ngOnInit(): void {
        this.volumeControl = new FormControl<number>(
            this.volume * 100,
            Validators.compose([Validators.min(0), Validators.max(100)]),
        ) as FormControl<number>;

        this.volumeControl.valueChanges.subscribe((value) => {
            this.updateVolume.emit(value / 100);
        });
    }
}
