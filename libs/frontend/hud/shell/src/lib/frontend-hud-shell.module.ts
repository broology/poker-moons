import { NgModule } from '@angular/core';
import { ActionPanelFeatureModule } from '@poker-moons/frontend/hud/feature/action-panel';
import { WinnerDisplayFeatureModule } from '@poker-moons/frontend/hud/feature/winner-display';
import { FrontendHudShellComponent } from './frontend-hud-shell.component';
@NgModule({
    imports: [ActionPanelFeatureModule, WinnerDisplayFeatureModule],
    declarations: [FrontendHudShellComponent],
    exports: [FrontendHudShellComponent],
})
export class FrontendHudShellModule {}
