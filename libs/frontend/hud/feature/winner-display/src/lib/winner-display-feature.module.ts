import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { WinnerDisplayFeatureComponent } from './winner-display-feature.component';
import { WinnerDisplayUiModule } from './winner-display-ui/winner-display-ui.module';

export const winnerDisplayFeatureImports = [...([CommonModule, PushModule, WinnerDisplayUiModule] as const)];

@NgModule({
    imports: winnerDisplayFeatureImports,
    declarations: [WinnerDisplayFeatureComponent],
    exports: [WinnerDisplayFeatureComponent],
})
export class WinnerDisplayFeatureModule {}
