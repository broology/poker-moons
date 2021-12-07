import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontendTableShellRoutingModule } from './frontend-table-shell-routing.module';
import { FrontendTableShellComponent } from './frontend-table-shell.component';

@NgModule({
    imports: [CommonModule, FrontendTableShellRoutingModule],
    declarations: [FrontendTableShellComponent],
})
export class FrontendTableShellModule {}
