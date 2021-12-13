import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, RouterModule],
    declarations: [AppComponent, CardComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
