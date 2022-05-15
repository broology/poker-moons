import { Component, Input } from '@angular/core';

/**
 * @description The depth level of where the entities are relative to the table.
 *
 * - `front`: entity is at the front of the table
 * - `middle`: entity is at the middle of the table
 * - `back`: entity is at the back of the table
 */
export type DepthLevel = 'front' | 'middle' | 'back';

/**
 * @description Component that transforms each of the children components scale to simulate a level
 *              of depth at the table. aka. the smaller the further away.
 *
 * @usage
```html
<poker-moons-depth-transform [depth]="depth">
    <!-- Children components to be scaled to the appropriate depth -->
</poker-moons-depth-transform>
```
 */
@Component({
    selector: 'poker-moons-depth-transform',
    templateUrl: './depth-transform.component.html',
    styleUrls: ['./depth-transform.component.scss'],
})
export class DepthTransformComponent {
    depthTransform: Record<DepthLevel, { transform: string }> = {
        front: { transform: 'scale(1)' },
        middle: { transform: 'scale(0.85)' },
        back: { transform: 'scale(0.70)' },
    };

    /**
     * @description The depth level where the child entities are relative to the table
     */
    @Input() depth!: DepthLevel;
}
