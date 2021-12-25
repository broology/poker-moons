import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipStackModule } from './chip-stack/chip-stack.module';
import { ChipsComponent } from './chips.component';

@NgModule({
    imports: [CommonModule, ChipStackModule],
    declarations: [ChipsComponent],
    exports: [ChipsComponent],
})
export class ChipsModule {}
