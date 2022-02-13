import { NgModule } from '@angular/core';
import { ChipRenderPipe } from './chip-render.pipe';

@NgModule({
    declarations: [ChipRenderPipe],
    exports: [ChipRenderPipe],
})
export class ChipRenderModule {}
