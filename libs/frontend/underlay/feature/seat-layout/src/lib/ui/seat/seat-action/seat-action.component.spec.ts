import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatActionComponent } from './seat-action.component';

describe('SeatActionComponent', () => {
    let component: SeatActionComponent;
    let fixture: ComponentFixture<SeatActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeatActionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeatActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
