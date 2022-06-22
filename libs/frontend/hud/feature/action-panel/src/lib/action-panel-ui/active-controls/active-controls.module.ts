import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DollarInputModule, PrimaryButtonModule, SliderInputModule } from '@poker-moons/frontend/shared/ui';
import { HudFrameModule } from '../../shared';
import { ActiveControlsComponent } from './active-controls.component';

export const activeControlsImports = [
    ...([
        CommonModule,
        ReactiveFormsModule,
        HudFrameModule,
        PrimaryButtonModule,
        DollarInputModule,
        SliderInputModule,
    ] as const),
];

@NgModule({
    imports: activeControlsImports,
    declarations: [ActiveControlsComponent],
    exports: [ActiveControlsComponent],
})
export class ActiveControlsModule {}
