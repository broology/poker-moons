import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerOrientation } from '../shared/type';
import { ChipDenomination, ChipStackData, STACKS_PER_ROW } from './chip.type';
import { chipOrientationTransform } from './chips-orientation-transform';
import { applyDifferenceToChipStack, buildOptimalChipStack, buildUnOptimalChipStack } from './chips.util';

@Component({
    selector: 'poker-moons-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent implements OnChanges {
    @Input() amount!: number;

    /**
     * @description When optimal is `true` the chip stack will be build as efficiently as grouping the chips
     * into the denominations.
     *
     * When optimal is `false`, the chip stack will intentionally not be efficient at grouping the chips in the denominations,
     * and try to keep a variety of chips in the stack. (Main use case being players chip stacks).
     */
    @Input() optimal = true;

    /**
     * @description When an orientation transform is required on chips, we need to supply it
     *              to the component its self, as just flipping the image does not work considering
     *              we are using svgs that are pre-3d.
     */
    @Input() orientation?: PlayerOrientation;

    /**
     * The count of each denomination in this stack
     */
    denominationCountMap: Record<ChipDenomination, number> = {
        5000: 0,
        2500: 0,
        1000: 0,
        500: 0,
        250: 0,
        100: 0,
        50: 0,
        25: 0,
        10: 0,
        5: 0,
        1: 0,
    };

    /**
     * The data for each chip stack to be displayed. Compiled together from the {@link amountToChipStackData} method.
     */
    chipStacks: ChipStackData[] = [];

    get invertZ() {
        return chipOrientationTransform[this.orientation || 'bottom'].invert.z;
    }

    /**
     * @description Life-cycle hook for the component.
     *
     * - On first render, if `optimal` is set, then will provide an optimal stack, otherwise will create a semi uniform stack.
     * - On future renders, if the `amount` changes, then calculates the diff and applies it to the chip stack in a "realistic" way,
     * performing trade in and such to keep consistency on the chips.
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.amount) {
            return;
        }

        if (changes.amount.isFirstChange()) {
            const { chipStacks, denominationCountMap } = this.amountToChipStackData(changes.amount.currentValue);

            this.chipStacks = chipStacks;
            this.denominationCountMap = denominationCountMap;
            return;
        }

        if (changes.amount.currentValue !== changes.amount.previousValue) {
            const { chipStacks, denominationCountMap } = applyDifferenceToChipStack(
                changes.amount.currentValue - changes.amount.previousValue,
                this.denominationCountMap,
            );

            this.chipStacks = chipStacks;
            this.denominationCountMap = denominationCountMap;
            return;
        }
    }

    /**
     * @description Determines the `x` offset to apply to the individual chip stack depending on it's `col` and `row` value,
     *              and the orientation constants.
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
     * @description Determines the `y` offset to apply to the individual chip stack depending on it's `col` and `row` value,
     *              and the orientation constants.
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

    /**
     * @description Determines the `x` offset to apply to the entire chip stack to center it in the `div` element,
     *              given the `col` and `row` values, and the orientation constants.
     */
    calculateXOffset() {
        const row = Math.floor(this.chipStacks.length / STACKS_PER_ROW);
        const col = row > 0 ? STACKS_PER_ROW : this.chipStacks.length % STACKS_PER_ROW;
        const transform = chipOrientationTransform[this.orientation || 'bottom'];

        return transform.offset.x.base + (col * transform.offset.x.col + row * transform.offset.x.row);
    }

    /**
     * @description Determines the `y` offset to apply to the entire chip stack to center it in the `div` element,
     *              given the `col` and `row` values.
     */
    calculateYOffset() {
        const row = Math.floor(this.chipStacks.length / STACKS_PER_ROW);
        const col = row > 0 ? STACKS_PER_ROW : this.chipStacks.length % STACKS_PER_ROW;
        const transform = chipOrientationTransform[this.orientation || 'bottom'];

        return transform.offset.y.base + (col * transform.offset.y.col + row * transform.offset.y.row);
    }

    /**
     * @description Converts the amount of dollars to be displayed into the count of each poker chip.
     * Also taking to account the {@link MAX_CHIPS_PER_STACK} and building multiple stacks of the same type.
     *
     * @param amount - The amount to be displayed in poker chips
     * @returns {ChipStackData[]} - The data for the individual poker chip stacks
     */
    private amountToChipStackData(amount: number): {
        chipStacks: ChipStackData[];
        denominationCountMap: Record<ChipDenomination, number>;
    } {
        if (this.optimal) {
            return buildOptimalChipStack(amount);
        }

        return buildUnOptimalChipStack(amount);
    }
}
