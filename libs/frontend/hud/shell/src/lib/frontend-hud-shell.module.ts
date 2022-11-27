import { NgModule } from '@angular/core';
import { ActionPanelFeatureModule } from '@poker-moons/frontend/hud/feature/action-panel';
import { SoundFeatureModule } from '@poker-moons/frontend/hud/feature/sound';
import { WinnerDisplayFeatureModule } from '@poker-moons/frontend/hud/feature/winner-display';
import { FrontendHudShellComponent } from './frontend-hud-shell.component';
@NgModule({
    imports: [ActionPanelFeatureModule, SoundFeatureModule, WinnerDisplayFeatureModule],
    declarations: [FrontendHudShellComponent],
    exports: [FrontendHudShellComponent],
})
export class FrontendHudShellModule {}
