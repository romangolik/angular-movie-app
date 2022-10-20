import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { HttpModule } from '@core/http/http.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    HttpModule,
    AppRouting,
    BrowserModule,
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
