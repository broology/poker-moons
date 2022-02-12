/**
 * The max number of chips that will fit on one stack
 */
export const MAX_CHIPS_PER_STACK = 10;

/**
 * The denominations of poker chips available in reverse order.
 * - It is in reverse order so that we can easily apply the computations to calculate how much the `amount` splits into each denomination
 */
export const chipDenominations = [5000, 2500, 1000, 500, 250, 100, 50, 25, 10, 5, 1] as const;
export type ChipDenomination = typeof chipDenominations[number];
