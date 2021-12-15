import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { FrontendTableUiUnderlayComponent } from './frontend-table-ui-underlay.component';
import { SeatLayoutModule } from './seat-layout/seat-layout.module';
import { TableDisplayModule } from './table-display/table-display.module';

@NgModule({
    imports: [CommonModule, TableDisplayModule, SeatLayoutModule, PushModule],
    declarations: [FrontendTableUiUnderlayComponent],
    exports: [FrontendTableUiUnderlayComponent],
})
export class FrontendTableUiUnderlayModule {}
