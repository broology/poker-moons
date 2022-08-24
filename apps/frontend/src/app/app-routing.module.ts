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
                    loadChildren: () => import('@poker-moons/frontend/landing').then((m) => m.FrontendLandingModule),
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
                    redirectTo: '',
                },
            ],
            {
                initialNavigation: 'enabledBlocking',
            },
        ),
    ],
})
export class AppRoutingModule {}
