import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontendTableUiUnderlayComponent } from './frontend-table-ui-underlay.component';
import { SeatLayoutModule } from './seat-layout/seat-layout.module';
import { TableDisplayModule } from './table-display/table-display.module';

@NgModule({
    imports: [CommonModule, TableDisplayModule, SeatLayoutModule],
    declarations: [FrontendTableUiUnderlayComponent],
})
export class FrontendTableUiUnderlayModule {}
