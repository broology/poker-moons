import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    loadChildren: () =>
                        import('@poker-moons/frontend/table/shell').then((m) => m.FrontendTableShellModule),
                },
            ],
            {
                initialNavigation: 'enabledBlocking',
            },
        ),
    ],
})
export class AppRoutingModule {}
