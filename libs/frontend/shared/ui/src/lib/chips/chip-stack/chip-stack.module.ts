import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { ChipStackComponent } from './chip-stack.component';

export const chipStackImports = [...([CommonModule, AssetUrlModule] as const)];

@NgModule({
    imports: chipStackImports,
    declarations: [ChipStackComponent],
    exports: [ChipStackComponent],
})
export class ChipStackModule {}
