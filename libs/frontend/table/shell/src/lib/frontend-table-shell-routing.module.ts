import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendTableShellComponent } from './frontend-table-shell.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':tableId',
                component: FrontendTableShellComponent,
            },

            //TODO 404 table not found page
        ]),
    ],
})
export class FrontendTableShellRoutingModule {}
