import { NgModule } from '@angular/core';
import { AppUrlPipe } from './app-url.pipe';

@NgModule({
    declarations: [AppUrlPipe],
    exports: [AppUrlPipe],
})
export class AppUrlModule {}
