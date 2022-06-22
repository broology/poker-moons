import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CountDownModule, PrimaryButtonModule } from '@poker-moons/frontend/shared/ui';
import { HudFrameModule } from '../../shared';
import { LobbyCountDownModule } from './count-down/lobby-count-down.module';
import { LobbyControlsComponent } from './lobby-controls.component';

export const lobbyControlsImports = [
    ...([
        CommonModule,
        ReactiveFormsModule,
        HudFrameModule,
        PrimaryButtonModule,
        LobbyCountDownModule,
        CountDownModule,
    ] as const),
];

@NgModule({
    imports: lobbyControlsImports,
    declarations: [LobbyControlsComponent],
    exports: [LobbyControlsComponent],
})
export class LobbyControlsModule {}
