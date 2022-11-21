import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';

describe('SeatLayoutUiComponent', () => {
    let component: SeatLayoutUiComponent;
    let fixture: ComponentFixture<SeatLayoutUiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeatLayoutUiComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeatLayoutUiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
