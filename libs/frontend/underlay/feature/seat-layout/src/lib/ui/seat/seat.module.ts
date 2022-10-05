import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { SeatActionModule } from './seat-action/seat-action.module';
import { SeatPlayerModule } from './seat-player/seat-player.module';
import { SeatStatusModule } from './seat-status/seat-status.module';
import { SeatComponent } from './seat.component';

export const seatModuleImports = [
    ...([CommonModule, SeatActionModule, SeatPlayerModule, SeatStatusModule, PushModule] as const),
];

@NgModule({
    imports: [
        seatModuleImports,
        PushModule,
    ],
    declarations: [SeatComponent],
    exports: [SeatComponent],
})
export class SeatModule {
}
