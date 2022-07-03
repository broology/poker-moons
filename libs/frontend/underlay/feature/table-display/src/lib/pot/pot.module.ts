import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipsModule } from '@poker-moons/frontend/shared/ui';
import { PotComponent } from './pot.component';

export const potModuleImports = [...([CommonModule, ChipsModule] as const)];

@NgModule({
    imports: potModuleImports,
    declarations: [PotComponent],
    exports: [PotComponent],
})
export class PotModule {}
