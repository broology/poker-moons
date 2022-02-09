import { randomInt } from 'crypto';

/**
 * Generates a random number in the range of 0 to the provided max value
 *
 * @param max - the max value of the random range (exclusive)
 *
 * @returns the randomly generated number in range or 0 if `max` <= 0 or greater than the max safe integer
 */
export function generateRandomNumber(max: number): number {
    if (max <= 0 || max > Number.MAX_SAFE_INTEGER) {
        return 0;
    }

    // https://nodejs.org/api/crypto.html#crypto_crypto_randomint_min_max_callback
    const chosen = randomInt(max);

    return chosen;
}
