import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPanelFeatureComponent } from './action-panel-feature.component';

describe('ActionPanelFeatureComponent', () => {
    let component: ActionPanelFeatureComponent;
    let fixture: ComponentFixture<ActionPanelFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionPanelFeatureComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionPanelFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
