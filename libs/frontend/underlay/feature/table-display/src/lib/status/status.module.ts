import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipCurrencyModule } from '@poker-moons/frontend/shared/ui';
import { StatusComponent } from './status.component';

export const statusModuleImports = [...([CommonModule, ChipCurrencyModule] as const)];

@NgModule({
    imports: statusModuleImports,
    declarations: [StatusComponent],
    exports: [StatusComponent],
})
export class StatusModule {}
