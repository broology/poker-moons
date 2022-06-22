import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        component.options = {
            floor: 0,
            ceil: 100,
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
