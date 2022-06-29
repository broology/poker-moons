import {
    ChipDenomination,
    chipDenominations,
    ChipStackData,
    MAX_CHIPS_PER_STACK,
    reverseChipDenominations,
    STACKS_PER_ROW,
} from './chip.type';

/**
 * @description Builds the most optimal chip stack that fit into the denomination's for the
 * given {@link amount}.
 *
 * @param amount Amount of dollars to convert into optimal chip stacks
 *
 * @returns Optimal chip stack for the given {@link amount}.
 */
export function buildOptimalChipStack(amount: number): {
    chipStacks: ChipStackData[];
    denominationCountMap: Record<ChipDenomination, number>;
} {
    const chipStacks: ChipStackData[] = [];
    const denominationCountMap: Record<ChipDenomination, number> = {
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

    const getColumn = () => chipStacks.length % STACKS_PER_ROW;
    const getRow = () => Math.floor(chipStacks.length / STACKS_PER_ROW);

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

        denominationCountMap[denomination] = count;
    }

    return { chipStacks, denominationCountMap };
}

/**
 * @description Builds a non-optimal chip stack to give the stack a larger feel with multiple different types
 * of denominations.
 *
 * @param amount Amount of dollars to convert into a non-optimal chip stacks
 *
 * @returns Non-optimal chip stack for the given {@link amount}.
 */
export function buildUnOptimalChipStack(amount: number): {
    chipStacks: ChipStackData[];
    denominationCountMap: Record<ChipDenomination, number>;
} {
    const denominationCountMap: Record<ChipDenomination, number> = {
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

    let remaining = amount;
    let idx = 0;

    while (remaining > 0) {
        const loopIdx = idx++ % reverseChipDenominations.length;
        const denomination = reverseChipDenominations[loopIdx];

        if (denomination <= remaining) {
            denominationCountMap[denomination]++;

            remaining -= denomination;
        }
    }

    return {
        denominationCountMap,
        chipStacks: buildChipStackFromDenominationCounts(denominationCountMap),
    };
}

function buildChipStackFromDenominationCounts(denominationCountMap: Record<ChipDenomination, number>): ChipStackData[] {
    const chipStacks: ChipStackData[] = [];

    const getColumn = () => chipStacks.length % STACKS_PER_ROW;
    const getRow = () => Math.floor(chipStacks.length / STACKS_PER_ROW);

    for (const denomination of chipDenominations) {
        const count = denominationCountMap[denomination];

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
 * @description Performs a trade in to split given chips to have at least {@link count} of {@link denomination}.
 * Given the current {@link denominationCountMap}
 */
function tradeInChips(
    denominationCountMap: Record<ChipDenomination, number>,
    denomination: ChipDenomination,
    count: number,
): Record<ChipDenomination, number> {
    const denominationIdx = chipDenominations.indexOf(denomination);

    while (denominationCountMap[denomination] < count)
        for (let y = denominationIdx - 1; y >= 0; y--) {
            const yDenomination = chipDenominations[y];
            if (denominationCountMap[yDenomination] > 0) {
                denominationCountMap[yDenomination]--;
                denominationCountMap[chipDenominations[y + 1]] = Math.floor(yDenomination / chipDenominations[y + 1]);
                const remainder = yDenomination % chipDenominations[y + 1];
                if (remainder > 0) {
                    denominationCountMap[chipDenominations[y + 2]]++;
                }

                break;
            }
        }

    return denominationCountMap;
}

/**
 * @description Calculates the diff to apply to the chip stacks. Instead of re-determining the entire stack,
 * this will just take the chips off that is required. And will make it look "realistic".
 *
 * @param difference change in `amount`
 * @param denominationCountMap the current chip stacks to apply the difference to.
 *
 * @returns {ChipStackData[]} - The data for the individual poker chip stacks
 */
export function applyDifferenceToChipStack(
    difference: number,
    denominationCountMap: Record<ChipDenomination, number>,
): {
    chipStacks: ChipStackData[];
    denominationCountMap: Record<ChipDenomination, number>;
} {
    let operation: 'add' | 'subtract';
    if (difference > 0) {
        operation = 'add';
    } else {
        operation = 'subtract';
    }

    let total = Math.abs(difference);

    for (let x = 0; x < chipDenominations.length; x++) {
        const denomination = chipDenominations[x];

        if (total < denomination) {
            continue;
        }

        const count = Math.floor(total / denomination);
        const delta = denomination * count;
        total -= delta;

        if (operation === 'add') {
            denominationCountMap[denomination] += count;
        } else {
            if (denominationCountMap[denomination] - count < 0) {
                denominationCountMap = tradeInChips(denominationCountMap, denomination, count);
            }

            denominationCountMap[denomination] -= count;
        }
    }

    return {
        denominationCountMap,
        chipStacks: buildChipStackFromDenominationCounts(denominationCountMap),
    };
}
