import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPanelFeatureComponent } from './bank-panel-feature.component';

describe('BankPanelFeatureComponent', () => {
    let component: BankPanelFeatureComponent;
    let fixture: ComponentFixture<BankPanelFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BankPanelFeatureComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BankPanelFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
