import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerOrientation } from '../shared/type';
import { ChipDenomination, chipDenominations, MAX_CHIPS_PER_STACK } from './chip.type';
import { chipOrientationTransform } from './chips-orientation-transform';

/**
 * TODO Step 1:
 * - Get a component that will takin an `amount` and spread it into chip denominations for display
 *
 * TODO Step 2:
 * - Add animations to make changes to the amount smooth
 */

interface ChipStackData {
    count: number;
    denomination: ChipDenomination;
    col: number;
    row: number;
}

@Component({
    selector: 'poker-moons-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
    /**
     * The number of stacks in a row before making to an new row
     */
    private static STACKS_PER_ROW = 4;

    @Input() set amount(value: number) {
        this.chipStacks = ChipsComponent.amountToChipStackData(value);
    }

    /**
     * @description When an orientation transform is required on chips, we need to supply it
     *              to the component its self, as just flipping the image does not work considering
     *              we are using svgs that are pre-3d.
     */
    @Input() orientation?: PlayerOrientation;

    /**
     * The data for each chip stack to be displayed. Compiled together from the {@link amountToChipStackData} method.
     */
    chipStacks!: ChipStackData[];

    get invertZ() {
        return chipOrientationTransform[this.orientation || 'bottom'].invert.z;
    }

    /**
     * Converts the amount of dollars to be displayed into the count of each poker chip.
     * Also taking to account the {@link MAX_CHIPS_PER_STACK} and building multiple stacks of the same type.
     *
     * @param amount - The amount to be displayed in poker chips
     * @returns {ChipStackData[]} - The data for the individual poker chip stacks
     */
    private static amountToChipStackData(amount: number): ChipStackData[] {
        const chipStacks: ChipStackData[] = [];

        const getColumn = () => chipStacks.length % ChipsComponent.STACKS_PER_ROW;
        const getRow = () => Math.floor(chipStacks.length / ChipsComponent.STACKS_PER_ROW);

        let total = amount;
        for (const denomination of chipDenominations) {
            const count = Math.floor(total / denomination);
            const delta = denomination * count;
            total -= delta;

            // * Build full stacks
            const stacks = Math.floor(count / MAX_CHIPS_PER_STACK);
            for (let x = 0; x < stacks; x++) {
                chipStacks.push({
                    count: MAX_CHIPS_PER_STACK,
                    denomination,
                    col: getColumn(),
                    row: getRow(),
                });
            }

            // * Build the remainder stack
            const remainder = count % MAX_CHIPS_PER_STACK;
            if (remainder > 0) {
                chipStacks.push({
                    count: remainder,
                    denomination,
                    col: getColumn(),
                    row: getRow(),
                });
            }
        }

        return chipStacks;
    }

    /**
     * Determines the `x` offset to apply to the chip stack depending on it's `col` and `row` value.
     *
     * The goal is to have the chips look 3D. So we also add an extra offset if its on a further row.
     * This is to emulate the look that the chips are slotted in-between each other.
     *
     * @param col - Column the stack should be in
     * @param row - Row the stack should be in
     * @returns - The number of pixels to shift the chip-stack from the `left`
     */
    calculateXPosition(col: number, row: number): number {
        const transform = chipOrientationTransform[this.orientation || 'bottom'];

        return (col * transform.delta.x.col + row * transform.delta.x.row) * (transform.invert.y ? -1 : 1);
    }

    /**
     * Determines the `y` offset to apply to the chip stack depending on it's `col` and `row` value.
     *
     * The goal is to have the chips be close enough to each other that it looks like they are touching.
     *
     * If `invertZ` is true, then will reverse the z axis display of the chips.
     *
     * @param col - Column the stack should be in
     * @param row - Row the stack should be in
     * @returns - The number of pixels to shift the chip-stack from the `top`
     */
    calculateYPosition(col: number, row: number): number {
        const transform = chipOrientationTransform[this.orientation || 'bottom'];

        return (col * transform.delta.y.col + row * transform.delta.y.row) * (transform.invert.z ? -1 : 1);
    }

    calculateXOffset() {
        const row = Math.floor(this.chipStacks.length / ChipsComponent.STACKS_PER_ROW);
        const col = row > 0 ? ChipsComponent.STACKS_PER_ROW : this.chipStacks.length % ChipsComponent.STACKS_PER_ROW;
        const transform = chipOrientationTransform[this.orientation || 'bottom'];

        return transform.offset.x.base + (col * transform.offset.x.col + row * transform.offset.x.row);
    }

    calculateYOffset() {
        const row = Math.floor(this.chipStacks.length / ChipsComponent.STACKS_PER_ROW);
        const col = row > 0 ? ChipsComponent.STACKS_PER_ROW : this.chipStacks.length % ChipsComponent.STACKS_PER_ROW;
        const transform = chipOrientationTransform[this.orientation || 'bottom'];

        return transform.offset.y.base + (col * transform.offset.y.col + row * transform.offset.y.row);
    }
}
