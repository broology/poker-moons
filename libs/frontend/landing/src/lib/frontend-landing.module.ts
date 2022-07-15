import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LandingButtonModule } from '@poker-moons/frontend/shared/ui';
import { FrontendLandingComponent } from './frontend-landing.component';

export const frontendLandingImports = [
    ...([
        CommonModule,
        FlexLayoutModule,
        LandingButtonModule,
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
    declarations: [FrontendLandingComponent],
    exports: [FrontendLandingComponent],
})
export class FrontendLandingModule {}
