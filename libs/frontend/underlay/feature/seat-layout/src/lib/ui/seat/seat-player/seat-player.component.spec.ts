import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { SeatPlayerComponent } from './seat-player.component';
import { seatPlayerImports } from './seat-player.module';

describe('SeatPlayerComponent', () => {
    let component: SeatPlayerComponent;
    let fixture: ComponentFixture<SeatPlayerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: seatPlayerImports,
            declarations: [SeatPlayerComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeatPlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
