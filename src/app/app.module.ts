import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { HttpModule } from '@core/http/http.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    HttpModule,
    AppRouting,
    RouterModule,
    BrowserModule,
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
