import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HudFrameComponent } from './hud-frame.component';

export const hudFrameImports = [...([CommonModule] as const)];

@NgModule({
    imports: hudFrameImports,
    declarations: [HudFrameComponent],
    exports: [HudFrameComponent],
})
export class HudFrameModule {}
