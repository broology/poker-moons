import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommunityCardsComponent } from './community-cards/community-cards.component';
import { PotComponent } from './pot/pot.component';
import { SeatActionComponent } from './seat-action/seat-action.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { SeatPlayerComponent } from './seat-player/seat-player.component';
import { SeatComponent } from './seat/seat.component';
import { StatusComponent } from './status/status.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        PotComponent,
        StatusComponent,
        CommunityCardsComponent,
        SeatLayoutComponent,
        SeatComponent,
        SeatPlayerComponent,
        SeatActionComponent,
    ],
})
export class FrontendTableFeatureUnderlayModule {}
