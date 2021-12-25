import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipStackComponent } from './chip-stack.component';

describe('ChipStackComponent', () => {
    let component: ChipStackComponent;
    let fixture: ComponentFixture<ChipStackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChipStackComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipStackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
