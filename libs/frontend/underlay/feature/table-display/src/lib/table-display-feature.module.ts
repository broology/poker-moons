import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule, PushModule } from '@rx-angular/template';
import { CommunityCardsModule } from './community-cards/community-cards.module';
import { PotModule } from './pot/pot.module';
import { StatusModule } from './status/status.module';
import { TableDisplayFeatureComponent } from './table-display-feature.component';

export const tableDisplayFeatureImports = [
    ...([CommonModule, CommunityCardsModule, PotModule, StatusModule, LetModule, PushModule] as const),
];

@NgModule({
    imports: tableDisplayFeatureImports,
    declarations: [TableDisplayFeatureComponent],
    exports: [TableDisplayFeatureComponent],
})
export class TableDisplayFeatureModule {}
