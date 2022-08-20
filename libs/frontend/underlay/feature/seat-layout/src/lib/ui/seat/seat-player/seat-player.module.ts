import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipCurrencyModule } from '@poker-moons/frontend/shared/ui';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { SeatPlayerComponent } from './seat-player.component';

export const seatPlayerImports = [...([AssetUrlModule, CommonModule, ChipCurrencyModule] as const)];

@NgModule({
    imports: seatPlayerImports,
    declarations: [SeatPlayerComponent],
    exports: [SeatPlayerComponent],
})
export class SeatPlayerModule {}
