import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DepthLevel, PlayerOrientation } from '@poker-moons/frontend/shared/ui';
import { MutablePublicPlayer } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-action',
    templateUrl: './seat-action.component.html',
    styleUrls: ['./seat-action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatActionComponent {
    @Input() depthLevel!: DepthLevel;

    @Input() playerOrientation!: PlayerOrientation;

    @Input() mutablePlayer!: MutablePublicPlayer | null;
}
