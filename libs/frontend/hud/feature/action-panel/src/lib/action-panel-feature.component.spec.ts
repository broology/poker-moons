import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState, TABLE_STATE } from '@poker-moons/frontend/shared/state/table';
import { ActionPanelFeatureComponent } from './action-panel-feature.component';
import { actionPanelFeatureImports } from './action-panel-feature.module';

describe('ActionPanelFeatureComponent', () => {
    let component: ActionPanelFeatureComponent;
    let fixture: ComponentFixture<ActionPanelFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: actionPanelFeatureImports,
            declarations: [ActionPanelFeatureComponent],
            providers: [
                provideMockStore({
                    initialState: {
                        [TABLE_STATE]: initialState,
                    },
                }),
            ],
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
