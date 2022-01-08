import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SpectatorControlsComponent } from './spectator-controls.component';

export const spectatorControlsImports = [...([CommonModule, ReactiveFormsModule] as const)];

@NgModule({
    imports: spectatorControlsImports,
    declarations: [SpectatorControlsComponent],
    exports: [SpectatorControlsComponent],
})
export class SpectatorControlsModule {}
