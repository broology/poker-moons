import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InActiveControlsComponent } from './in-active-controls.component';

export const inActiveControlsImports = [...([CommonModule] as const)];

@NgModule({
    imports: inActiveControlsImports,
    declarations: [InActiveControlsComponent],
    exports: [InActiveControlsComponent],
})
export class InActiveControlsModule {}
