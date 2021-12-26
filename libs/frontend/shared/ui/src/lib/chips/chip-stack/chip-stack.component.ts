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

    /**
     * The max number of chips that will fit on one stack
     */
    MAX_CHIPS_PER_STACK = 10;

    @Input() set count(value: number) {
        this.stacks = this.distributeCount(value);
    }

    @Input() colour!: string;

    /**
     * The amount of numbers in count but into an array, so it can be used in an `ngFor`
     */
    stacks!: number[][];

    // /**
    //  * The css filter that is applied to the images in the stack
    //  */
    // cssFilter!: string;

    private distributeCount(count: number): number[][] {
        const temp: number[][] = [];

        for (let x = 0; x < count; x++) {
            const stackIdx = Math.floor(x / this.MAX_CHIPS_PER_STACK);
            const chip = x % this.MAX_CHIPS_PER_STACK;

            if (temp[stackIdx]) {
                temp[stackIdx].push(chip);
            } else {
                temp[stackIdx] = [chip];
            }
        }
        return temp;
    }
}
