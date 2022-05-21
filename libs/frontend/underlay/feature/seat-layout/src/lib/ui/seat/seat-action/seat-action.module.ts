import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    CardModule,
    CardOrientationTransformModule,
    ChipsModule,
    DepthTransformModule,
} from '@poker-moons/frontend/shared/ui';
import { SeatActionComponent } from './seat-action.component';

@NgModule({
    imports: [CommonModule, CardModule, CardOrientationTransformModule, ChipsModule, DepthTransformModule],
    declarations: [SeatActionComponent],
    exports: [SeatActionComponent],
})
export class SeatActionModule {}
