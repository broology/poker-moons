import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, RouterModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
