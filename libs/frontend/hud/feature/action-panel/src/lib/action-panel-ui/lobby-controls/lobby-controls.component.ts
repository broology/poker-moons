import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'poker-moons-lobby-controls',
    templateUrl: './lobby-controls.component.html',
    styleUrls: ['./lobby-controls.component.scss'],
})
export class LobbyControlsComponent {
    /**
     * @description Whether the client player has readied them selfs or not
     */
    @Input() ready!: boolean;

    /**
     * @description If all players are ready, this is the date at which the game will start in UTC.
     *              Otherwise, is null
     */
    @Input() startDate!: Date | null;

    @Output() toggleReadyStatusEmitter = new EventEmitter<void>();

    toggleReadyStatus(): void {
        this.toggleReadyStatusEmitter.emit();
    }
}
