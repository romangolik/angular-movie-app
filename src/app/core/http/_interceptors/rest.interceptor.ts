import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.getChangedRequest(request));
  }

  private getChangedRequest(request: HttpRequest<unknown>): HttpRequest<any> {
    return request.clone(this.getRequestParams(request));
  }

  private getRequestParams(request: HttpRequest<unknown>) {
    return {
      setHeaders: {
        ...this.getContentTypeHeader(request)
      }
    };
  }

  private getContentTypeHeader(request: HttpRequest<unknown>): {'Content-Type': string, Authorization: string} {
    if (request.method === 'GET') {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTk5NDJlOWYxN2E3ODFjM2Y1ZWI0YTkxZTQ0MzUzYSIsInN1YiI6IjYzNGQxMzFiZWY5ZDcyMDA3ZDA2ZTg2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CJcHKRrxGy6nhYGGqlWpQVyKwgG_kI6hPF13JNeA7MQ'
      };
    }
  }
}
