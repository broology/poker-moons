import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutFeatureComponent } from './seat-layout-feature.component';
import { SeatLayoutUiModule } from './ui/seat-layout-ui.module';

@NgModule({
    imports: [CommonModule, SeatLayoutUiModule],
    declarations: [SeatLayoutFeatureComponent],
    exports: [SeatLayoutFeatureComponent],
})
export class SeatLayoutFeatureModule {}
