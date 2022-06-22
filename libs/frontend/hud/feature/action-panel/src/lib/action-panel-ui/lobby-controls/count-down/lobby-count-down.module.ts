import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountDownModule } from '@poker-moons/frontend/shared/ui';
import { PushModule } from '@rx-angular/template';
import { LobbyCountDownComponent } from './lobby-count-down.component';

export const lobbyCountDownImports = [...([CommonModule, CountDownModule, PushModule] as const)];

@NgModule({
    imports: lobbyCountDownImports,
    declarations: [LobbyCountDownComponent],
    exports: [LobbyCountDownComponent],
})
export class LobbyCountDownModule {}
