import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendUnderlayShellModule } from '@poker-moons/frontend/underlay/shell';
import { UnderlayHudSeparatorComponent } from './underlay-hud-separator.component';

@NgModule({
    imports: [
        CommonModule,
        FrontendUnderlayShellModule,
        RouterModule.forChild([
            {
                path: '',
                component: UnderlayHudSeparatorComponent,
                loadChildren: () => import('@poker-moons/frontend/hud/shell').then((m) => m.FrontendHudShellModule),
            },
        ]),
    ],
    declarations: [UnderlayHudSeparatorComponent],
})
export class UnderlayHudSeparatorModule {}
