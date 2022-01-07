import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';
import { SeatModule } from './seat/seat.module';

export const seatLayoutUiImports = [CommonModule, SeatModule] as const;

@NgModule({
    imports: [...seatLayoutUiImports],
    declarations: [SeatLayoutUiComponent],
    exports: [SeatLayoutUiComponent],
})
export class SeatLayoutUiModule {}
