import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutComponent } from './seat-layout.component';
import { SeatModule } from './seat/seat.module';

@NgModule({
    imports: [CommonModule, SeatModule],
    declarations: [SeatLayoutComponent],
})
export class SeatLayoutModule {}
