import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { FrontendBuilderFeatureFormComponent } from './frontend-builder-feature-form.component';
import { FrontendBuilderFormUiModule } from './frontend-builder-form-ui/frontend-builder-form-ui.module';
import { TableApiService } from './store/data-access/table-api.service';
import { FrontendBuilderStore } from './store/frontend-builder.store';

export const frontendBuilderFormFeatureImports = [
    ...([CommonModule, FrontendBuilderFormUiModule, PushModule, HttpClientModule] as const),
];

@NgModule({
    imports: frontendBuilderFormFeatureImports,
    declarations: [FrontendBuilderFeatureFormComponent],
    providers: [FrontendBuilderStore, TableApiService],
    exports: [FrontendBuilderFeatureFormComponent],
})
export class FrontendBuilderFeatureFormModule {}
