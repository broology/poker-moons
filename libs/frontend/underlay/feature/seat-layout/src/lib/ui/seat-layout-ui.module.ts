import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';
import { SeatModule } from './seat/seat.module';
import { PushModule } from '@rx-angular/template';

export const seatLayoutUiImports = [CommonModule, SeatModule, PushModule] as const;

@NgModule({
    imports: [...seatLayoutUiImports],
    declarations: [SeatLayoutUiComponent],
    exports: [SeatLayoutUiComponent],
})
export class SeatLayoutUiModule {}
