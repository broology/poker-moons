import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * TODO Step 1:
 * - Get a component that will takin an `amount` and spread it into chip denominations for display
 *
 * TODO Step 2:
 * - Add animations to make changes to the amount smooth
 */

/**
 * The denominations of poker chips available in reverse order.
 * - It is in reverse order so that we can easily apply the computations to calculate how much the `amount` splits into each denomination
 */
const denominations = [5000, 2500, 1000, 500, 250, 100, 50, 25, 10, 5, 1] as const;
type Denomination = typeof denominations[number];

interface ChipValue {
    count: number;
    colour: string;
}

@Component({
    selector: 'poker-moons-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
    /**
     * Chip colours taken from https://www.thesprucecrafts.com/standard-poker-chip-denominations-412236
     * - May want to fiddle with colours to make them match better
     */
    private static readonly chipDenominationColours: Record<Denomination, string> = {
        1: '#FFFFFF', // white
        5: '#D60C02', // red
        10: '#3435FA', // blue
        25: '#30B830', // green
        50: '#FF9124', // orange
        100: '#000000', // black
        250: '#D02BEB', // pink
        500: '#6E52EB', // purple
        1000: '#FAEE18', // yellow
        2500: '#A0D4FF', // light blue
        5000: '#B87426', // brown
    };

    chipValues!: ChipValue[];

    /**
     * Converts the amount of dollars to be displayed into the count of each poker chip
     *
     * @param amount - The amount to be displayed in poker chips
     * @returns {ChipValue[]} - The count of each poker chip to be displayed
     */
    private static amountToChipValues(amount: number): ChipValue[] {
        const chipValues: ChipValue[] = [];

        let total = amount;
        for (const denomination of denominations) {
            const count = Math.floor(total / denomination);
            const delta = denomination * count;
            total -= delta;
            if (count > 0) chipValues.push({ count, colour: ChipsComponent.chipDenominationColours[denomination] });
        }

        return chipValues;
    }

    @Input() set amount(value: number) {
        this.chipValues = ChipsComponent.amountToChipValues(value);
    }
}
