import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';

/**
 * @description Will generate a human readable realtime count down string of text to be displayed until
 *  the given date is reached.
 *
 * @example
 * ```html
 * <span>{{ new Date(...One minute in the future) | countDown | async }}</span>
 * ```
 * _Will render as:_
 * ```html
 * <span>1 minute</span>
 * ```
 *
 */
@Pipe({ name: 'countDown' })
export class CountDownPipe implements PipeTransform {
    /**
     * Gets the millisecond difference between a future date and now
     * @private
     * @param   date
     * @returns number  milliseconds remaining
     */
    private static getMsDiff = (date: Date): number => +new Date(date) - Date.now();

    /**
     * @private static
     *
     * @description Converts the unit to plural form if more than one amount exists.
     *
     * @param unit
     * @param amount
     * @returns
     */
    private static pluralize = (unit: string, amount: number): string => (amount > 1 ? `${unit}s` : unit);

    /**
     * @private @static
     *
     * @description Builds the displayable version of the {@link unit}'s {@link amount}.
     *
     * eg. `2 seconds` where unit is 'second', and amount is "2".
     *
     * @param unit
     * @param amount
     */
    private static formatUnit = (unit: string, amount: number): string =>
        amount < 1 ? '' : `${amount} ${CountDownPipe.pluralize(unit, amount)}`;

    /**
     * @description Transforms the future date to a count down until the future date.
     *
     * @param date    should be in a valid date in the future
     */
    transform(date: Date | null): Observable<string> {
        if (!date || CountDownPipe.getMsDiff(date) < 0) {
            return of('...');
        }
        return timer(0, 1000).pipe(
            map(() => {
                return this.msToTime(CountDownPipe.getMsDiff(date));
            }),
        );
    }

    /**
     * @private
     *
     * @description Converts the milliseconds remaining to a human readable string.
     *
     * eg. "1 hour, 5 minutes, 20 seconds"
     *
     */
    private msToTime(msRemaining: number): string {
        if (msRemaining < 0) {
            return '...';
        }

        const seconds = Math.floor((msRemaining / 1000) % 60),
            minutes = Math.floor((msRemaining / (1000 * 60)) % 60),
            hours = Math.floor((msRemaining / (1000 * 60 * 60)) % 24);

        return [
            CountDownPipe.formatUnit('hour', hours),
            CountDownPipe.formatUnit('minute', minutes),
            CountDownPipe.formatUnit('second', seconds),
        ]
            .filter((value) => !!value)
            .join(' ');
    }
}
