import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommunityCardsModule } from './community-cards/community-cards.module';
import { PotModule } from './pot/pot.module';
import { StatusModule } from './status/status.module';
import { TableDisplayFeatureComponent } from './table-display-feature.component';

@NgModule({
    imports: [CommonModule, CommunityCardsModule, PotModule, StatusModule],
    declarations: [TableDisplayFeatureComponent],
    exports: [TableDisplayFeatureComponent],
})
export class TableDisplayFeatureModule {}
