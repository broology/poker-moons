import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DepthTransformComponent } from './depth-transform.component';

export const depthTransformImports = [...([CommonModule] as const)];

@NgModule({
    imports: depthTransformImports,
    declarations: [DepthTransformComponent],
    exports: [DepthTransformComponent],
})
export class DepthTransformModule {}
