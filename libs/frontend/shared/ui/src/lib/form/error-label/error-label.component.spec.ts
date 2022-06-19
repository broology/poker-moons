import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorLabelComponent } from './error-label.component';
import { errorLabelImports } from './error-label.module';

describe('ErrorLabelComponent', () => {
    let component: ErrorLabelComponent;
    let fixture: ComponentFixture<ErrorLabelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: errorLabelImports,
            declarations: [ErrorLabelComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
