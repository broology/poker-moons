import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { SeatActionModule } from './seat-action/seat-action.module';
import { SeatPlayerModule } from './seat-player/seat-player.module';
import { SeatComponent } from './seat.component';

@NgModule({
    imports: [CommonModule, SeatActionModule, SeatPlayerModule, PushModule],
    declarations: [SeatComponent],
    exports: [SeatComponent],
})
export class SeatModule {}
