import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CountDownModule, DialogModule, PrimaryButtonModule, TextInputModule } from '@poker-moons/frontend/shared/ui';
import { AppUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { HudFrameModule } from '../../shared';
import { LobbyCountDownModule } from './count-down/lobby-count-down.module';
import { LobbyControlsComponent } from './lobby-controls.component';

export const lobbyControlsImports = [
    ...([
        AppUrlModule,
        CommonModule,
        CountDownModule,
        DialogModule,
        HudFrameModule,
        LobbyCountDownModule,
        PrimaryButtonModule,
        ReactiveFormsModule,
        TextInputModule,
    ] as const),
];

@NgModule({
    imports: lobbyControlsImports,
    declarations: [LobbyControlsComponent],
    exports: [LobbyControlsComponent],
})
export class LobbyControlsModule {}
