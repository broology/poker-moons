import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CountDownModule, PrimaryButtonModule } from '@poker-moons/frontend/shared/ui';
import { HudFrameModule } from '../../shared';
import { LobbyControlsComponent } from './lobby-controls.component';

export const lobbyControlsImports = [
    ...([CommonModule, ReactiveFormsModule, HudFrameModule, PrimaryButtonModule, CountDownModule] as const),
];

@NgModule({
    imports: lobbyControlsImports,
    declarations: [LobbyControlsComponent],
    exports: [LobbyControlsComponent],
})
export class LobbyControlsModule {}
