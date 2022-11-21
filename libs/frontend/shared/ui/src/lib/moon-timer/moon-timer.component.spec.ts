import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { MoonTimerComponent } from './moon-timer.component';

describe('MoonTimerComponent', () => {
    let component: MoonTimerComponent;
    let fixture: ComponentFixture<MoonTimerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MoonTimerComponent],
            providers: [MockNgEnvironment],
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
