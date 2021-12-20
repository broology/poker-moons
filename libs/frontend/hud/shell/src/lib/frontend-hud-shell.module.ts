import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendHudShellComponent } from './frontend-hud-shell.component';

@NgModule({
    imports: [RouterModule, RouterModule.forChild([{ path: '', component: FrontendHudShellComponent }])],
    declarations: [FrontendHudShellComponent],
})
export class FrontendHudShellModule {}
