import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { CrudObsTestComponent } from './components/crud-obs-test/crud-obs-test.component';

@NgModule({ declarations: [
        AppComponent,
        CrudObsTestComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        ResourceModule.forRoot()], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
