import { CurrencyPipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

/**
 * @description Will transform a raw integer value to it's displayed chip currency value.
 *
 * @example
 *     <span>{{ 9328 | chipCurrency }}</span>
 *     // Will render as
 *     <span>$9,328</span>
 */
@Pipe({ name: 'chipCurrency' })
export class ChipCurrencyPipe implements PipeTransform {
    private currencyPipe = new CurrencyPipe(this.locale);

    constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

    transform(value: number): string | null {
        return this.currencyPipe.transform(value, 'USD', 'symbol', '1.0-0');
    }
}
