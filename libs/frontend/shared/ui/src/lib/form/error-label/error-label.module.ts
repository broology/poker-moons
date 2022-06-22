import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorLabelComponent } from './error-label.component';

export const errorLabelImports = [...([CommonModule] as const)];

@NgModule({
    imports: errorLabelImports,
    declarations: [ErrorLabelComponent],
    exports: [ErrorLabelComponent],
})
export class ErrorLabelModule {}
