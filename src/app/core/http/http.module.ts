import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HttpService } from './http.service';
import { HttpDataParserService } from '@core/http/data-parser/http.data.parser.service';

import { RestInterceptor } from '@core/http/_interceptors/rest.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    HttpDataParserService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: RestInterceptor
    }
  ]
})
export class HttpModule {}
