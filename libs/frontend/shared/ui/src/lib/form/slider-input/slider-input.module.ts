import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderInputComponent } from './slider-input.component';

export const sliderInputImports = [...([CommonModule, ReactiveFormsModule, NgxSliderModule] as const)];

@NgModule({
    imports: sliderInputImports,
    declarations: [SliderInputComponent],
    exports: [SliderInputComponent],
})
export class SliderInputModule {}
