import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatPlayerComponent } from './seat-player.component';

describe('SeatPlayerComponent', () => {
    let component: SeatPlayerComponent;
    let fixture: ComponentFixture<SeatPlayerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeatPlayerComponent],
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
