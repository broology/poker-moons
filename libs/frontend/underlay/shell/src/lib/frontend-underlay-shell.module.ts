import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { SeatLayoutFeatureModule } from '@poker-moons/frontend/underlay/feature/seat-layout';
import { TableDisplayFeatureModule } from '@poker-moons/frontend/underlay/feature/table-display';
import { PushModule } from '@rx-angular/template';
import { FrontendUnderlayShellComponent } from './frontend-underlay-shell.component';

export const frontendUnderlayShellImports = [
    AssetUrlModule,
    CommonModule,
    SeatLayoutFeatureModule,
    TableDisplayFeatureModule,
    PushModule,
];

@NgModule({
    imports: frontendUnderlayShellImports,
    declarations: [FrontendUnderlayShellComponent],
    exports: [FrontendUnderlayShellComponent],
})
export class FrontendUnderlayShellModule {}
