import { Component, Input } from '@angular/core';
import { PlayerOrientation } from '../../shared/type';

/**
 * @description Component that transforms the children card components to their appropriate table orientation.
 *
 * @usage ```html
 * <poker-moons-card-orientation-transform [orientation]="orientation">
 *     <!-- You may put a single card, or pre-styled pair of cards -->
 *     <poker-moons-card [card]="card"></poker-moons-card>
 * </poker-moons-card-orientation-transform>
 * ```
 */
@Component({
    selector: 'poker-moons-card-orientation-transform',
    templateUrl: './card-orientation-transform.component.html',
    styleUrls: ['./card-orientation-transform.component.scss'],
})
export class CardOrientationTransformComponent {
    orientationTransform: Record<PlayerOrientation, { transform: string }> = {
        bottom: { transform: 'rotate3d(0, 0, 0, 0deg) scale(1.5)' },
        bottomLeft: { transform: 'rotate3d(3, -1, 2, 75deg)' },
        bottomRight: { transform: 'rotate3d(3, 1, -2, 75deg)' },
        left: { transform: 'rotate3d(1, 0, 0, 50deg) rotateZ(90deg)' },
        right: { transform: 'rotate3d(1, 0, 0, 50deg) rotateZ(-90deg)' },
        top: { transform: 'rotate3d(1, 0, 0, 50deg) rotateZ(180deg)' },
        topLeft: { transform: 'rotate3d(3, 1, -2, 70deg) rotateZ(180deg)' },
        topRight: { transform: 'rotate3d(3, -1, 2, 70deg) rotateZ(180deg)' },
    };

    /**
     * @description The orientation at the table the card will be displayed (eg. bottomRight)
     */
    @Input() orientation!: PlayerOrientation;
}
