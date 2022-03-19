import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TableStateApiEffects } from './effects/api-effects';
import { TableStatePopupEffects } from './effects/pop-up.effects';
import { TableStateWsEffects } from './effects/ws.effects';
import { storeFeature } from './table.state';

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature(storeFeature),
        EffectsModule.forFeature([TableStateApiEffects, TableStatePopupEffects, TableStateWsEffects]),
    ],
})
export class TableStateModule {}
