import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { SeatLayoutFeatureComponent } from './seat-layout-feature.component';
import { seatLayoutFeatureImports } from './seat-layout-feature.module';

describe('SeatLayoutComponent', () => {
    let component: SeatLayoutFeatureComponent;
    let fixture: ComponentFixture<SeatLayoutFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: seatLayoutFeatureImports,
            declarations: [SeatLayoutFeatureComponent],
            providers: [provideMockStore(), MockNgEnvironment],
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
