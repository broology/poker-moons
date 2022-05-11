import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimaryButtonComponent } from './primary-button.component';

export const primaryButtonModuleImports = [...([CommonModule, FontAwesomeModule, FlexLayoutModule] as const)];

@NgModule({
    imports: primaryButtonModuleImports,
    declarations: [PrimaryButtonComponent],
    exports: [PrimaryButtonComponent],
})
export class PrimaryButtonModule {}
