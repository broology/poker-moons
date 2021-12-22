import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';
import { SeatModule } from './seat/seat.module';

@NgModule({
    imports: [CommonModule, SeatModule],
    declarations: [SeatLayoutUiComponent],
    exports: [SeatLayoutUiComponent],
})
export class SeatLayoutUiModule {}
