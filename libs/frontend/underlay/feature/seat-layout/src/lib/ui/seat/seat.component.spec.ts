import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SeatComponent } from './seat.component';
import { seatModuleImports } from './seat.module';

describe('SeatComponent', () => {
    let component: SeatComponent;
    let fixture: ComponentFixture<SeatComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: seatModuleImports,
            declarations: [SeatComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
