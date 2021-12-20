import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BankPanelFeatureComponent } from './bank-panel-feature.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BankPanelFeatureComponent],
    exports: [BankPanelFeatureComponent],
})
export class BankPanelFeatureModule {}
