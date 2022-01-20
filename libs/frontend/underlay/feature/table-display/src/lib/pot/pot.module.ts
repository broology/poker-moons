import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PotComponent } from './pot.component';

export const potModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: potModuleImports,
    declarations: [PotComponent],
    exports: [PotComponent],
})
export class PotModule {}
