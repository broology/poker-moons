import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableRoutingGuard } from './guard/table-routing.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'builder',
                },
                {
                    path: 'builder',
                    loadChildren: () =>
                        // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
                        import('@poker-moons/frontend/builder/shell').then((m) => m.FrontendBuilderShellModule),
                },
                {
                    path: 'table/:tableId',
                    canActivate: [TableRoutingGuard],
                    loadChildren: () =>
                        import('./underlay-hud-separator/underlay-hud-separator.module').then(
                            (m) => m.UnderlayHudSeparatorModule,
                        ),
                },
                {
                    path: '**',
                    redirectTo: 'builder',
                },
            ],
            {
                initialNavigation: 'enabledBlocking',
            },
        ),
    ],
})
export class AppRoutingModule {}
