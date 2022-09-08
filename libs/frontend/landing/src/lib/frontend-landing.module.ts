import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LandingButtonModule } from '@poker-moons/frontend/shared/ui';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { SeatPlayerModule } from 'libs/frontend/underlay/feature/seat-layout/src/lib/ui/seat/seat-player/seat-player.module';
import { FrontendLandingComponent } from './frontend-landing.component';
import { TableBuilderStore } from './store/table-builder.store';

export const frontendLandingImports = [
    ...([
        AssetUrlModule,
        CommonModule,
        FlexLayoutModule,
        LandingButtonModule,
        HttpClientModule,
        SeatPlayerModule,
        RouterModule.forChild([
            {
                path: '',
                component: FrontendLandingComponent,
            },
        ]),
    ] as const),
];

@NgModule({
    imports: frontendLandingImports,
    providers: [TableBuilderStore],
    declarations: [FrontendLandingComponent],
    exports: [FrontendLandingComponent],
})
export class FrontendLandingModule {}
