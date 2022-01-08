import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommunityCardsComponent } from './community-cards.component';

export const communityCardsModuleImports = [...([CommonModule] as const)];

@NgModule({
    imports: communityCardsModuleImports,
    declarations: [CommunityCardsComponent],
    exports: [CommunityCardsComponent],
})
export class CommunityCardsModule {}
