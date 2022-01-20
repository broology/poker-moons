import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveControlsComponent } from './active-controls.component';

export const activeControlsImports = [...([CommonModule, ReactiveFormsModule] as const)];

@NgModule({
    imports: activeControlsImports,
    declarations: [ActiveControlsComponent],
    exports: [ActiveControlsComponent],
})
export class ActiveControlsModule {}
