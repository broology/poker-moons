import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TableStateModule } from '@poker-moons/frontend/shared/state/table';
import { AuthModule } from '@poker-moons/frontend/shared/util/auth';
import { NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        AuthModule,
        // Angular Modules
        BrowserModule,

        // Routing
        RouterModule,
        AppRoutingModule,

        // NgRx State
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            autoPause: true,
            logOnly: environment.env === 'production',
        }),
        TableStateModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [{ provide: NG_ENVIRONMENT, useValue: environment }],
})
export class AppModule {}
