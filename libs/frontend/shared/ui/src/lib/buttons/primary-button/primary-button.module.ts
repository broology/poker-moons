import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimaryButtonComponent } from './primary-button.component';

export const primaryButtonModuleImports = [...([CommonModule, FontAwesomeModule] as const)];

@NgModule({
    imports: primaryButtonModuleImports,
    declarations: [PrimaryButtonComponent],
    exports: [PrimaryButtonComponent],
})
export class PrimaryButtonModule {}
