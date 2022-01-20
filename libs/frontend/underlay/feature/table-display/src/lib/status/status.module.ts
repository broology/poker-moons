import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatusComponent } from './status.component';

export const statusModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: statusModuleImports,
    declarations: [StatusComponent],
    exports: [StatusComponent],
})
export class StatusModule {}
