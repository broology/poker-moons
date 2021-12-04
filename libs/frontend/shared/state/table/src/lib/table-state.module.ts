import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TableStateApiEffects } from './effects/api-effects';
import { TableStateWsEffects } from './effects/ws.effects';
import { storeFeature } from './table.state';

@NgModule({
    imports: [
        StoreModule.forFeature(storeFeature),
        EffectsModule.forFeature([TableStateApiEffects, TableStateWsEffects]),
    ],
})
export class TableStateModule {}
