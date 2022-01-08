import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatActionComponent } from './seat-action.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SeatActionComponent],
    exports: [SeatActionComponent],
})
export class SeatActionModule {}