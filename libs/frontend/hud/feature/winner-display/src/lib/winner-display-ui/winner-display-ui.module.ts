import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@poker-moons/frontend/shared/ui';
import { WinnerDisplayUiComponent } from './winner-display-ui.component';

export const winnerDisplayUiImports = [...([CommonModule, DialogModule] as const)];

@NgModule({
    imports: winnerDisplayUiImports,
    declarations: [WinnerDisplayUiComponent],
    exports: [WinnerDisplayUiComponent],
})
export class WinnerDisplayUiModule {}
