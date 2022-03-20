import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingButtonComponent } from './landing-button.component';

export const landingButtonModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: landingButtonModuleImports,
    declarations: [LandingButtonComponent],
    exports: [LandingButtonComponent],
})
export class LandingButtonModule {}
