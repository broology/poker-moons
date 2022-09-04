import { NgModule } from '@angular/core';
import { ActionPanelFeatureModule } from '@poker-moons/frontend/hud/feature/action-panel';
import { FrontendHudShellComponent } from './frontend-hud-shell.component';
@NgModule({
    imports: [ActionPanelFeatureModule],
    declarations: [FrontendHudShellComponent],
    exports: [FrontendHudShellComponent],
})
export class FrontendHudShellModule {}
