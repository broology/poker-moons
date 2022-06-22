import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

export const textInputImports = [...([CommonModule, ReactiveFormsModule] as const)];

@NgModule({
    imports: textInputImports,
    declarations: [TextInputComponent],
    exports: [TextInputComponent],
})
export class TextInputModule {}
