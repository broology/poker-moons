import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule, ErrorLabelModule, TextInputModule } from '@poker-moons/frontend/shared/ui';
import { FrontendBuilderFormUiComponent } from './frontend-builder-form-ui.component';

export const frontendBuilderFormUiImports = [
    ...([CommonModule, DialogModule, ReactiveFormsModule, TextInputModule, ErrorLabelModule] as const),
];

@NgModule({
    imports: frontendBuilderFormUiImports,
    declarations: [FrontendBuilderFormUiComponent],
    exports: [FrontendBuilderFormUiComponent],
})
export class FrontendBuilderFormUiModule {}
