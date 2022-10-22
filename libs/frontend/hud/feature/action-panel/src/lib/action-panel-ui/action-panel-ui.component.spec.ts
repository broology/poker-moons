import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialState } from '@poker-moons/frontend/shared/state/table';
import { ActionPanelUiComponent } from './action-panel-ui.component';
import { actionPanelUiImports } from './action-panel-ui.module';

describe('ActionPanelUiComponent', () => {
    let component: ActionPanelUiComponent;
    let fixture: ComponentFixture<ActionPanelUiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: actionPanelUiImports,
            declarations: [ActionPanelUiComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionPanelUiComponent);
        component = fixture.componentInstance;
        component.loaders = initialState.loaders;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
