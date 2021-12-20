import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { SeatLayoutComponent } from './seat-layout.component';
import { SeatModule } from './seat/seat.module';

@NgModule({
    imports: [CommonModule, SeatModule, PushModule],
    declarations: [SeatLayoutComponent],
    exports: [SeatLayoutComponent],
})
export class SeatLayoutModule {}
