import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontendLandingComponent } from './frontend-landing.component';

export const frontendLandingImports = [...([CommonModule] as const)];

@NgModule({
    imports: frontendLandingImports,
    declarations: [FrontendLandingComponent],
    exports: [FrontendLandingComponent],
})
export class FrontendLandingModule {}
