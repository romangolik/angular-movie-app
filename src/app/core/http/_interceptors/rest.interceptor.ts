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

  private getContentTypeHeader(request: HttpRequest<unknown>): {'Content-Type': string} {
    if (!(request.body instanceof FormData)) {
      return {
        'Content-Type': 'application/json'
      };
    }
  }
}
