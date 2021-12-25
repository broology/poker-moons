import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatLayoutFeatureModule } from '@poker-moons/frontend/underlay/feature/seat-layout';
import { TableDisplayFeatureModule } from '@poker-moons/frontend/underlay/feature/table-display';
import { PushModule } from '@rx-angular/template';
import { FrontendUnderlayShellComponent } from './frontend-underlay-shell.component';

@NgModule({
    imports: [CommonModule, SeatLayoutFeatureModule, TableDisplayFeatureModule, PushModule],
    declarations: [FrontendUnderlayShellComponent],
    exports: [FrontendUnderlayShellComponent],
})
export class FrontendUnderlayShellModule {}
