import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { SliderInputComponent } from './slider-input.component';
import { sliderInputImports } from './slider-input.module';

describe('SliderInputComponent', () => {
    let component: SliderInputComponent;
    let fixture: ComponentFixture<SliderInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: sliderInputImports,
            declarations: [SliderInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderInputComponent);
        component = fixture.componentInstance;
        component.max = 100;
        component.min = 500;
        component.control = new FormControl();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
