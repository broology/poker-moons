import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimaryButtonModule, SecondaryButtonModule } from '../buttons';
import { DialogComponent } from './dialog.component';

export const dialogImports = [...([CommonModule, PrimaryButtonModule, SecondaryButtonModule] as const)];

@NgModule({
    imports: dialogImports,
    declarations: [DialogComponent],
    exports: [DialogComponent],
})
export class DialogModule {}
