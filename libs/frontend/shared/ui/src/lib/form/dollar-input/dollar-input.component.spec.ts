import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DollarInputComponent } from './dollar-input.component';
import { dollarInputImports } from './dollar-input.module';

describe('DollarInputComponent', () => {
    let component: DollarInputComponent;
    let fixture: ComponentFixture<DollarInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: dollarInputImports,
            declarations: [DollarInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DollarInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
