import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { hexToCssFilter } from './util/colour-solver';

@Component({
    selector: 'poker-moons-chip-stack',
    templateUrl: './chip-stack.component.html',
    styleUrls: ['./chip-stack.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipStackComponent {
    @Input() set count(value: number) {
        this.numbers = Array(value)
            .fill(0)
            .map((x, i) => i);
    }

    @Input() set colour(hex: string) {
        this.cssFilter = hexToCssFilter(hex);
    }

    /**
     * The amount of numbers in count but into an array, so it can be used in an `ngFor`
     */
    numbers!: number[];

    /**
     * The css filter that is applied to the images in the stack
     */
    cssFilter!: string;
}
