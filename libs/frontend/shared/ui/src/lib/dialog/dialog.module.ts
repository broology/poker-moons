import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';

export const dialogImports = [...([CommonModule] as const)];

@NgModule({
    imports: dialogImports,
    declarations: [DialogComponent],
    exports: [DialogComponent],
})
export class DialogModule {}
