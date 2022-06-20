import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoonTimerComponent } from './moon-timer.component';

export const moonTimerModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: moonTimerModuleImports,
    declarations: [MoonTimerComponent],
    exports: [MoonTimerComponent],
})
export class MoonTimerModule {}
