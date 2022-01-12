import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendBuilderFeatureFormModule } from '@poker-moons/frontend/builder/feature/form';
import { FrontendBuilderShellComponent } from './frontend-builder-shell.component';

export const frontendBuilderShellImports = [
    ...([
        CommonModule,
        FrontendBuilderFeatureFormModule,
        RouterModule.forChild([
            {
                path: '',
                component: FrontendBuilderShellComponent,
            },
        ]),
    ] as const),
];

@NgModule({
    imports: frontendBuilderShellImports,
    declarations: [FrontendBuilderShellComponent],
})
export class FrontendBuilderShellModule {}
