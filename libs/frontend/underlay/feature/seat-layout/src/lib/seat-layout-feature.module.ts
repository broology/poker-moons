import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { SeatLayoutFeatureComponent } from './seat-layout-feature.component';
import { SeatModule } from './seat/seat.module';

@NgModule({
    imports: [CommonModule, SeatModule, PushModule],
    declarations: [SeatLayoutFeatureComponent],
    exports: [SeatLayoutFeatureComponent],
})
export class SeatLayoutFeatureModule {}
