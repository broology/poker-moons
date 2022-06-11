import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@poker-moons/frontend/shared/ui';
import { HudFrameModule } from '../../shared';
import { SpectatorControlsComponent } from './spectator-controls.component';

export const spectatorControlsImports = [
    ...([CommonModule, DialogModule, ReactiveFormsModule, HudFrameModule] as const),
];

@NgModule({
    imports: spectatorControlsImports,
    declarations: [SpectatorControlsComponent],
    exports: [SpectatorControlsComponent],
})
export class SpectatorControlsModule {}
