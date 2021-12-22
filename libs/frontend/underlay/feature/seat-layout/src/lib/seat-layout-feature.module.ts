import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { SeatLayoutFeatureComponent } from './seat-layout-feature.component';
import { SeatLayoutUiModule } from './ui/seat-layout-ui.module';

@NgModule({
    imports: [CommonModule, SeatLayoutUiModule, PushModule],
    declarations: [SeatLayoutFeatureComponent],
    exports: [SeatLayoutFeatureComponent],
})
export class SeatLayoutFeatureModule {}
