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
    private static readonly chipDenominationColours: Record<Denomination, { colour: string }> = {
        1: { colour: '#FFFFFF' }, // white
        5: { colour: '#D60C02' }, // red
        10: { colour: '#3435FA' }, // blue
        25: { colour: '#30B830' }, // green
        50: { colour: '#FF9124' }, // orange
        100: { colour: '#000000' }, // black
        250: { colour: '#D02BEB' }, // pink
        500: { colour: '#6E52EB' }, // purple
        1000: { colour: '#FAEE18' }, // yellow
        2500: { colour: '#A0D4FF' }, // light blue
        5000: { colour: '#B87426' }, // brown
    };

    chipDenominations!: Record<Denomination, number>;

    /**
     * Converts the amount of dollars to be displayed into the count of each poker chip
     *
     * @param amount - The amount to be displayed in poker chips
     * @returns {Record<Denomination, number>} - The count of each poker chip to be displayed
     */
    private static amountToChipDenominations(amount: number): Record<Denomination, number> {
        const chipDenominations = denominations.reduce((prev, cur) => ({ ...prev, [cur]: 0 }), {}) as Record<
            Denomination,
            number
        >;

        let total = amount;
        for (const denomination of denominations) {
            const count = Math.floor(total / denomination);
            const delta = denomination * count;
            total -= delta;

            chipDenominations[denomination] = count;
        }

        return chipDenominations;
    }

    @Input() set amount(value: number) {
        this.chipDenominations = ChipsComponent.amountToChipDenominations(value);
    }
}
