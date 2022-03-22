import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';

export const buttonModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: buttonModuleImports,
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule {}
