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

interface ChipStackData {
    count: number;
    colour: string;
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

    /**
     * The max number of chips that will fit on one stack
     */
    private static MAX_CHIPS_PER_STACK = 10;

    /**
     * The number of stacks in a row before making to an new row
     */
    private static STACKS_PER_ROW = 4;

    chipStacks!: ChipStackData[];

    /**
     * Converts the amount of dollars to be displayed into the count of each poker chip
     *
     * @param amount - The amount to be displayed in poker chips
     * @returns {ChipStackData[]} - The data for the individual poker chip stacks
     */
    private static amountToChipStackData(amount: number): ChipStackData[] {
        const chipStacks: ChipStackData[] = [];

        const getColumn = () => chipStacks.length % ChipsComponent.STACKS_PER_ROW;
        const getRow = () => Math.floor(chipStacks.length / ChipsComponent.STACKS_PER_ROW);

        let total = amount;
        for (const denomination of denominations) {
            const count = Math.floor(total / denomination);
            const delta = denomination * count;
            total -= delta;

            // * Build full stacks
            const stacks = Math.floor(count / ChipsComponent.MAX_CHIPS_PER_STACK);
            for (let x = 0; x < stacks; x++) {
                chipStacks.push({
                    count: ChipsComponent.MAX_CHIPS_PER_STACK,
                    colour: ChipsComponent.chipDenominationColours[denomination],
                    col: getColumn(),
                    row: getRow(),
                });
            }

            // * Build the remainder stack
            const remainder = count % ChipsComponent.MAX_CHIPS_PER_STACK;
            if (remainder > 0) {
                chipStacks.push({
                    count: remainder,
                    colour: ChipsComponent.chipDenominationColours[denomination],
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
}
