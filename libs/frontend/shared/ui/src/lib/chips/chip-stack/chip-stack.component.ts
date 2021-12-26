import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'poker-moons-chip-stack',
    templateUrl: './chip-stack.component.html',
    styleUrls: ['./chip-stack.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipStackComponent {
    /**
     * The number of pixels to offset a chip between another for stacking chips
     */
    SINGLE_CHIP_OFFSET = 10;

    @Input() set count(value: number) {
        this.chips = new Array(value).fill(0).map((_, i) => i);
    }

    @Input() colour!: string;

    /**
     * The amount of numbers in count but into an array, so it can be used in an `ngFor`
     */
    chips!: number[];
}
