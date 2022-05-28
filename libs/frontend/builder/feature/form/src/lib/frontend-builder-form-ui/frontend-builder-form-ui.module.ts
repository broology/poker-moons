import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@poker-moons/frontend/shared/ui';
import { FrontendBuilderFormUiComponent } from './frontend-builder-form-ui.component';

export const frontendBuilderFormUiImports = [...([CommonModule, ReactiveFormsModule, DialogModule] as const)];

@NgModule({
    imports: frontendBuilderFormUiImports,
    declarations: [FrontendBuilderFormUiComponent],
    exports: [FrontendBuilderFormUiComponent],
})
export class FrontendBuilderFormUiModule {}
