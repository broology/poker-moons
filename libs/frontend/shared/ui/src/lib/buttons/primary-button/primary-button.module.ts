import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimaryButtonComponent } from './primary-button.component';

export const primaryButtonModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: primaryButtonModuleImports,
    declarations: [PrimaryButtonComponent],
    exports: [PrimaryButtonComponent],
})
export class PrimaryButtonModule {}
