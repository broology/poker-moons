import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountDownPipe } from './count-down.pipe';

export const countDownImports = [...([CommonModule] as const)];

@NgModule({
    imports: countDownImports,
    declarations: [CountDownPipe],
    exports: [CountDownPipe],
})
export class CountDownModule {}
