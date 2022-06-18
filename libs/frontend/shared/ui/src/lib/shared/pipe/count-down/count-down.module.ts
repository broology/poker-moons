import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountDownPipe } from './count-down.pipe';

export const dialogImports = [...([CommonModule] as const)];

@NgModule({
    imports: dialogImports,
    declarations: [CountDownPipe],
    exports: [CountDownPipe],
})
export class CountDownModule {}
