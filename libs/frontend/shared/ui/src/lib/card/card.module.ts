import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetUrlModule } from '@poker-moons/frontend/shared/util/environment';
import { CardComponent } from './card.component';

export const cardImports = [...([CommonModule, AssetUrlModule] as const)];

@NgModule({
    imports: cardImports,
    declarations: [CardComponent],
    exports: [CardComponent],
})
export class CardModule {}
