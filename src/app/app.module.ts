import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppRouting,
    BrowserModule,
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
