import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerOrientation } from '../shared/type';
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
     * @description List of player orientations that require a y-axis, and z-axis inversion.
     *
     * The provided offsetX and offsetY are used to center the transformed chips into the ui container.
     */
    orientationTransform: Record<
        PlayerOrientation,
        { invertY: boolean; invertZ: boolean; offsetX: number; offsetY: number }
    > = {
        bottom: { invertY: false, invertZ: false, offsetX: 35, offsetY: 50 },
        bottomLeft: { invertY: false, invertZ: false, offsetX: 35, offsetY: 50 },
        bottomRight: { invertY: true, invertZ: false, offsetX: 240, offsetY: 50 },
        left: { invertY: false, invertZ: false, offsetX: 35, offsetY: 50 },
        right: { invertY: true, invertZ: false, offsetX: 240, offsetY: 50 },
        top: { invertY: true, invertZ: true, offsetX: 240, offsetY: 80 },
        topLeft: { invertY: false, invertZ: true, offsetX: 50, offsetY: 80 },
        topRight: { invertY: true, invertZ: true, offsetX: 240, offsetY: 80 },
    };

    @Input() set amount(value: number) {
        this.chipStacks = ChipsComponent.amountToChipStackData(value);
    }

    /**
     * @description When an orientation transform is required on chips, we need to supply it
     *              to the component its self, as just flipping the image does not work considering
     *              we are using svgs that are pre-3d.
     */
    @Input() orientation?: PlayerOrientation;

    get invertY() {
        return !this.orientation ? false : this.orientationTransform[this.orientation].invertY;
    }
    get invertZ() {
        return !this.orientation ? false : this.orientationTransform[this.orientation].invertZ;
    }

    get offsetX() {
        return !this.orientation ? 0 : this.orientationTransform[this.orientation].offsetX;
    }
    get offsetY() {
        return !this.orientation ? 0 : this.orientationTransform[this.orientation].offsetY;
    }

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
        return this.offsetX + (col * 62 + row * 31) * (this.invertY ? -1 : 1);
    }

    /**
     * Determines the `y` offset to apply to the chip stack depending on it's `row` value.
     *
     * The goal is to have the chips be close enough to each other that it looks like they are touching.
     *
     * If `invertZ` is true, then will reverse the z axis display of the chips.
     *
     * @param row - Row the stack should be in
     * @returns - The number of pixels to shift the chip-stack from the `top`
     */
    calculateYPosition(row: number): number {
        return this.offsetY + row * 15 * (this.invertZ ? -1 : 1);
    }
}
