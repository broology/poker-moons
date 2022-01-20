import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { ActionPanelFeatureComponent } from './action-panel-feature.component';
import { ActionPanelUiModule } from './action-panel-ui/action-panel-ui.module';

export const actionPanelFeatureImports = [...([CommonModule, ActionPanelUiModule, PushModule] as const)];

@NgModule({
    imports: actionPanelFeatureImports,
    declarations: [ActionPanelFeatureComponent],
    exports: [ActionPanelFeatureComponent],
})
export class ActionPanelFeatureModule {}
