import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionPanelUiComponent } from './action-panel-ui.component';
import { ActiveControlsModule } from './active-controls/active-controls.module';
import { InActiveControlsModule } from './in-active-controls/in-active-controls.module';
import { SpectatorControlsModule } from './spectator-controls/spectator-controls.module';

export const actionPanelUiImports = [
    ...([CommonModule, ActiveControlsModule, InActiveControlsModule, SpectatorControlsModule] as const),
];

@NgModule({
    imports: actionPanelUiImports,
    declarations: [ActionPanelUiComponent],
    exports: [ActionPanelUiComponent],
})
export class ActionPanelUiModule {}
