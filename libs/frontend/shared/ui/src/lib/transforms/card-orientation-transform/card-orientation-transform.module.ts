import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardOrientationTransformComponent } from './card-orientation-transform.component';

export const cardOrientationTransformImports = [...([CommonModule] as const)];

@NgModule({
    imports: cardOrientationTransformImports,
    declarations: [CardOrientationTransformComponent],
    exports: [CardOrientationTransformComponent],
})
export class CardOrientationTransformModule {}
