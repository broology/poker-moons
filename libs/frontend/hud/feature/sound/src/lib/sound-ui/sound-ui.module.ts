import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecondaryButtonModule, SliderInputModule } from '@poker-moons/frontend/shared/ui';
import { SoundUiComponent } from './sound-ui.component';

export const soundUiImports = [...([CommonModule, SecondaryButtonModule, SliderInputModule] as const)];

@NgModule({
    imports: soundUiImports,
    declarations: [SoundUiComponent],
    exports: [SoundUiComponent],
})
export class SoundUiModule {}
