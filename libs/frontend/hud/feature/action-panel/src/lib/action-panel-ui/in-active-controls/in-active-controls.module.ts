import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HudFrameModule } from '../../shared';
import { InActiveControlsComponent } from './in-active-controls.component';

export const inActiveControlsImports = [...([CommonModule, HudFrameModule] as const)];

@NgModule({
    imports: inActiveControlsImports,
    declarations: [InActiveControlsComponent],
    exports: [InActiveControlsComponent],
})
export class InActiveControlsModule {}
