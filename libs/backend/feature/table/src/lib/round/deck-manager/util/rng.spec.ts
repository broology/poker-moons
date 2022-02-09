import { generateRandomNumber } from './rng';

describe('generateRandomNumber', () => {
    it('should return 0 if the max value provided is less than 0', () => {
        expect(generateRandomNumber(-5)).toBe(0);
    });

    it('should return 0 if the max value provided is 0', () => {
        expect(generateRandomNumber(0)).toBe(0);
    });

    it('should return 0 if the max value provided is greater than the max safe integer', () => {
        expect(generateRandomNumber(Number.MAX_SAFE_INTEGER + 1)).toBe(0);
    });

    it('should be greater than or equal to 0 and less than or equal to 51 if the max value provided is 52', () => {
        expect(generateRandomNumber(52)).toBeGreaterThanOrEqual(0);
        expect(generateRandomNumber(52)).toBeLessThanOrEqual(51);
    });
});
