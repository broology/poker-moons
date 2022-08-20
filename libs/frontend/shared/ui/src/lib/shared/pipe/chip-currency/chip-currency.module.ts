import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipCurrencyPipe } from './chip-currency.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ChipCurrencyPipe],
    exports: [ChipCurrencyPipe],
})
export class ChipCurrencyModule {}
