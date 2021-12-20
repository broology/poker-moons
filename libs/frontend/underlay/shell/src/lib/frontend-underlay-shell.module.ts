import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { FrontendUnderlayShellComponent } from './frontend-underlay-shell.component';
import { SeatLayoutModule } from './seat-layout/seat-layout.module';
import { TableDisplayModule } from './table-display/table-display.module';

@NgModule({
    imports: [CommonModule, SeatLayoutModule, TableDisplayModule, PushModule],
    declarations: [FrontendUnderlayShellComponent],
    exports: [FrontendUnderlayShellComponent],
})
export class FrontendUnderlayShellModule {}
