import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingButtonComponent } from './landing-button.component';

export const landingButtonModuleImports = [...([CommonModule, FontAwesomeModule, FlexLayoutModule] as const)];

@NgModule({
    imports: landingButtonModuleImports,
    declarations: [LandingButtonComponent],
    exports: [LandingButtonComponent],
})
export class LandingButtonModule {}
