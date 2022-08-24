import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipCurrencyModule } from '@poker-moons/frontend/shared/ui';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { SeatStatusComponent } from './seat-status.component';

export const seatStatusImports = [...([AssetUrlModule, CommonModule, ChipCurrencyModule] as const)];

@NgModule({
    imports: seatStatusImports,
    declarations: [SeatStatusComponent],
    exports: [SeatStatusComponent],
})
export class SeatStatusModule {}
