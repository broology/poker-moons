import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { SoundFeatureComponent } from './sound-feature.component';
import { SoundUiModule } from './sound-ui/sound-ui.module';

export const soundFeatureImports = [...([CommonModule, PushModule, SoundUiModule] as const)];

@NgModule({
    imports: soundFeatureImports,
    declarations: [SoundFeatureComponent],
    exports: [SoundFeatureComponent],
})
export class SoundFeatureModule {}
