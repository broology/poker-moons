import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { SeatPlayerComponent } from './seat-player.component';

export const seatPlayerImports = [...([CommonModule, AssetUrlModule] as const)];

@NgModule({
    imports: seatPlayerImports,
    declarations: [SeatPlayerComponent],
    exports: [SeatPlayerComponent],
})
export class SeatPlayerModule {}
