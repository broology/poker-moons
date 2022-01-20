import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommunityCardsComponent } from './community-cards.component';
import { CardModule } from '@poker-moons/frontend/shared/ui';

export const communityCardsModuleImports = [...([CommonModule, CardModule] as const)];

@NgModule({
    imports: communityCardsModuleImports,
    declarations: [CommunityCardsComponent],
    exports: [CommunityCardsComponent],
})
export class CommunityCardsModule {}
