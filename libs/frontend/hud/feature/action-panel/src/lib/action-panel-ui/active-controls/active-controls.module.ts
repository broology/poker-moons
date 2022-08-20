import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    ChipCurrencyModule,
    DollarInputModule,
    PrimaryButtonModule,
    SliderInputModule,
} from '@poker-moons/frontend/shared/ui';
import { LetModule } from '@rx-angular/template';
import { HudFrameModule } from '../../shared';
import { ActiveControlsComponent } from './active-controls.component';

export const activeControlsImports = [
    ...([
        CommonModule,
        ChipCurrencyModule,
        DollarInputModule,
        HudFrameModule,
        PrimaryButtonModule,
        LetModule,
        ReactiveFormsModule,
        SliderInputModule,
    ] as const),
];

@NgModule({
    imports: activeControlsImports,
    declarations: [ActiveControlsComponent],
    exports: [ActiveControlsComponent],
})
export class ActiveControlsModule {}
