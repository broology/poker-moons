import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontendTableFeatureUnderlayComponent } from './frontend-table-feature-underlay.component';
import { FrontendTableUiUnderlayModule } from './ui/frontend-table-ui-underlay.module';

@NgModule({
    imports: [CommonModule, FrontendTableUiUnderlayModule],
    declarations: [FrontendTableFeatureUnderlayComponent],
    exports: [FrontendTableFeatureUnderlayComponent],
})
export class FrontendTableFeatureUnderlayModule {}
