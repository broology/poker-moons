import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendTableShellComponent } from './frontend-table-shell.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: FrontendTableShellComponent }])],
})
export class FrontendTableShellRoutingModule {}
