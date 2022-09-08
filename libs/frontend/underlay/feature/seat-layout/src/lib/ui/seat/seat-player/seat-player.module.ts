import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipCurrencyModule, MoonTimerModule } from '@poker-moons/frontend/shared/ui';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { SeatPlayerComponent } from './seat-player.component';

export const seatPlayerImports = [...([AssetUrlModule, CommonModule, ChipCurrencyModule, MoonTimerModule] as const)];

@NgModule({
    imports: seatPlayerImports,
    declarations: [SeatPlayerComponent],
    exports: [SeatPlayerComponent],
})
export class SeatPlayerModule {}
