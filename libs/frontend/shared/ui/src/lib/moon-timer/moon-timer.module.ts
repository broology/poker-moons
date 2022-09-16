import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@rx-angular/template';
import { MoonTimerComponent } from './moon-timer.component';

export const moonTimerModuleImports = [...([CommonModule, LetModule] as const)];

@NgModule({
    imports: moonTimerModuleImports,
    declarations: [MoonTimerComponent],
    exports: [MoonTimerComponent],
})
export class MoonTimerModule {}
