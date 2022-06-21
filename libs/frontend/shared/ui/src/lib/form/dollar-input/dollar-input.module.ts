import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DollarInputComponent } from './dollar-input.component';

export const dollarInputImports = [...([CommonModule, ReactiveFormsModule] as const)];

@NgModule({
    imports: dollarInputImports,
    declarations: [DollarInputComponent],
    exports: [DollarInputComponent],
})
export class DollarInputModule {}
