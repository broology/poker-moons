import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';
import { environment } from '../environments/environment';

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
    providers: [{ provide: NG_ENVIRONMENT, useValue: environment }],
})
export class AppRoutingModule {}
