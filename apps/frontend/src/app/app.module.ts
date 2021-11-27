import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' })],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
