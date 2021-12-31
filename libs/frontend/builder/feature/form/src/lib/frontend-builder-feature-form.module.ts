import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { FrontendBuilderFeatureFormComponent } from './frontend-builder-feature-form.component';
import { FrontendBuilderFormUiModule } from './frontend-builder-form-ui/frontend-builder-form-ui.module';

export const frontendBuilderFormFeatureImports = [
    ...([CommonModule, FrontendBuilderFormUiModule, PushModule] as const),
];

@NgModule({
    imports: frontendBuilderFormFeatureImports,
    declarations: [FrontendBuilderFeatureFormComponent],
    exports: [FrontendBuilderFeatureFormComponent],
})
export class FrontendBuilderFeatureFormModule {}
