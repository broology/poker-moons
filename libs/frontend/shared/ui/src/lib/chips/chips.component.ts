import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipDenomination, chipDenominations, MAX_CHIPS_PER_STACK } from './chip.type';

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

    /**
     * The data for each chip stack to be displayed. Compiled together from the {@link amountToChipStackData} method.
     */
    chipStacks!: ChipStackData[];

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

    @Input() set amount(value: number) {
        this.chipStacks = ChipsComponent.amountToChipStackData(value);
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
        return col * 62 + row * 31;
    }

    /**
     * Determines the `y` offset to apply to the chip stack depending on it's `row` value.
     *
     * The goal is to have the chips be close enough to each other that it looks like they are touching.
     *
     * @param row - Row the stack should be in
     * @returns - The number of pixels to shift the chip-stack from the `top`
     */
    calculateYPosition(row: number): number {
        return row * 15;
    }
}
