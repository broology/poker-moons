import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendTableFeatureUnderlayComponent } from './frontend-table-feature-underlay.component';

describe('FrontendTableFeatureUnderlayComponent', () => {
    let component: FrontendTableFeatureUnderlayComponent;
    let fixture: ComponentFixture<FrontendTableFeatureUnderlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FrontendTableFeatureUnderlayComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendTableFeatureUnderlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
