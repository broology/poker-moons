import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DepthLevel, PlayerOrientation } from '@poker-moons/frontend/shared/ui';
import { MutablePublicPlayer } from '@poker-moons/shared/type';
import { SeatActionOrientationTransform, seatActionOrientationTransform } from './seat-action-transform';

@Component({
    selector: 'poker-moons-seat-action',
    templateUrl: './seat-action.component.html',
    styleUrls: ['./seat-action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatActionComponent {
    /**
     * @description The level of depth this seat is placed at.
     */
    @Input() depthLevel!: DepthLevel;

    /**
     * @description The mutable data of the player in this seat.
     */
    @Input() mutablePlayer!: MutablePublicPlayer | null;

    /**
     * @description Setter to determine the orientation to display the chips and cards.
     */
    @Input() set playerOrientation(orientation: PlayerOrientation) {
        this.orientation = orientation;
        this.transform = seatActionOrientationTransform[orientation];
    }

    orientation!: PlayerOrientation;

    transform!: SeatActionOrientationTransform;
}
