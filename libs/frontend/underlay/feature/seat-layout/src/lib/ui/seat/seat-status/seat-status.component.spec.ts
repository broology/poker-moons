import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { SeatStatusComponent } from './seat-status.component';
import { seatStatusImports } from './seat-status.module';

describe('SeatStatusComponent', () => {
    let component: SeatStatusComponent;
    let fixture: ComponentFixture<SeatStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: seatStatusImports,
            declarations: [SeatStatusComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeatStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
