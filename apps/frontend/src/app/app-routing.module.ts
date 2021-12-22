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
                        import('./underlay-hud-separator/underlay-hud-separator.module').then(
                            (m) => m.UnderlayHudSeparatorModule,
                        ),
                },
            ],
            {
                initialNavigation: 'enabledBlocking',
            },
        ),
    ],
})
export class AppRoutingModule {}
