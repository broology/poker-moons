import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendHudShellModule } from '@poker-moons/frontend/hud/shell';
import { FrontendUnderlayShellModule } from '@poker-moons/frontend/underlay/shell';
import { UnderlayHudSeparatorComponent } from './underlay-hud-separator.component';

@NgModule({
    imports: [
        CommonModule,
        FrontendUnderlayShellModule,
        FrontendHudShellModule,
        RouterModule.forChild([{ path: '', component: UnderlayHudSeparatorComponent }]),
    ],
    declarations: [UnderlayHudSeparatorComponent],
})
export class UnderlayHudSeparatorModule {}
