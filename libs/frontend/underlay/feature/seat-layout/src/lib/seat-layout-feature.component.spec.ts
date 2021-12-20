import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatLayoutFeatureComponent } from './seat-layout-feature.component';

describe('SeatLayoutComponent', () => {
    let component: SeatLayoutFeatureComponent;
    let fixture: ComponentFixture<SeatLayoutFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeatLayoutFeatureComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeatLayoutFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
