import { Component, Input } from '@angular/core';
import { DepthLevel } from '../../shared/type';

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
        0: { transform: 'scale(1)' },
        1: { transform: 'scale(0.9)' },
        2: { transform: 'scale(0.8)' },
        3: { transform: 'scale(0.7)' },
    };

    /**
     * @description The depth level where the child entities are relative to the table
     */
    @Input() depth!: DepthLevel;
}
