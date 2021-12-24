import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutFeatureComponent } from './seat-layout-feature.component';
import { SeatLayoutUiModule } from './ui/seat-layout-ui.module';

export const seatLayoutFeatureImports = [...([CommonModule, SeatLayoutUiModule] as const)];

@NgModule({
    imports: seatLayoutFeatureImports,
    declarations: [SeatLayoutFeatureComponent],
    exports: [SeatLayoutFeatureComponent],
})
export class SeatLayoutFeatureModule {}
