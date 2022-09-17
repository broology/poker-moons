import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoonTimerComponent } from './moon-timer.component';

describe('MoonTimerComponent', () => {
    let component: MoonTimerComponent;
    let fixture: ComponentFixture<MoonTimerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MoonTimerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MoonTimerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
