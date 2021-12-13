import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendTableUiUnderlayComponent } from './frontend-table-ui-underlay.component';

describe('FrontendTableUiUnderlayComponent', () => {
    let component: FrontendTableUiUnderlayComponent;
    let fixture: ComponentFixture<FrontendTableUiUnderlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FrontendTableUiUnderlayComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendTableUiUnderlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
