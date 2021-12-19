import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { FrontendTableFeatureUnderlayComponent } from './frontend-table-feature-underlay.component';
import { SeatLayoutModule } from './seat-layout/seat-layout.module';
import { TableDisplayModule } from './table-display/table-display.module';

@NgModule({
    imports: [CommonModule, SeatLayoutModule, TableDisplayModule, PushModule],
    declarations: [FrontendTableFeatureUnderlayComponent],
})
export class FrontendTableFeatureUnderlayModule {}
