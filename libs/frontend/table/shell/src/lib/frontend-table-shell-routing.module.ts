import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendTableShellComponent } from './frontend-table-shell.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FrontendTableShellComponent,
                data: {
                    builder: true,
                },
            },

            //TODO add guard that will detect if the table exists
            {
                path: ':tableId',
                component: FrontendTableShellComponent,
                data: {
                    join: true,
                },
            },

            //TODO 404 table not found page
        ]),
    ],
})
export class FrontendTableShellRoutingModule {}
