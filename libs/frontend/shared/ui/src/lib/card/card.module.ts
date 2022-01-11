import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';

export const cardImports = [...([CommonModule] as const)];

@NgModule({
    imports: cardImports,
    declarations: [CardComponent],
    exports: [CardComponent],
})
export class CardModule {}
