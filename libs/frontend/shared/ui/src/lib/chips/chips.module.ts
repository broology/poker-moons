import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipStackModule } from './chip-stack/chip-stack.module';
import { ChipsComponent } from './chips.component';

export const chipsModuleImports = [...([CommonModule, ChipStackModule] as const)];

@NgModule({
    imports: chipsModuleImports,
    declarations: [ChipsComponent],
    exports: [ChipsComponent],
})
export class ChipsModule {}
