import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpDataParserService } from '@core/http/data-parser/http.data.parser.service';

import { RequestOptions } from '@core/http/_types/request-options';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';

@Injectable()
export class HttpService extends HttpClient {

  constructor(
    handler: HttpHandler,
    private dataParser: HttpDataParserService
  ) {
    super(handler);
  }

  get<T>(
    url: string,
    params?: Params,
    DtoClass?: new (responseValue) => T
  ): Observable<T> {
    return super.get<T>(url, { params: this.dataParser.parseParams(params) })
      .pipe(
        map(response => DtoClass ? new DtoClass(response) : response)
      );
  }

  getAll<T>(
    url: string,
    params?: Params,
    DtoClass?: new (responseValue) => T,
    dataField?: string
  ): Observable<T[]> {
    return super.get<T[]>(url, { params: this.dataParser.parseParams(params) })
      .pipe(
        map(response => {
          const data = dataField ? response[dataField] : response;
          return DtoClass ? data.map(responseItem => new DtoClass(responseItem)) : response;
        })
      );
  }

  getAllWithPagination<T>(url: string, params?: Params, DtoClass?: new (responseItem) => T): Observable<PagebleDto<T>>
  getAllWithPagination<T>(url: string, params?: Params, converFunction?: (responseItem) => T): Observable<PagebleDto<T>>
  getAllWithPagination<T>(
    url: string,
    params?: Params,
    // eslint-disable-next-line @typescript-eslint/ban-types
    a?: Function
  ): Observable<PagebleDto<T>> {
    if (!!a) {
      return super.get<PagebleDto<T>>(url, { params: this.dataParser.parseParams(params) })
        .pipe(
          map(response => new PagebleDto({ ...response }))
        );
    }

    if (a.name) {
      return super.get<PagebleDto<T>>(url, { params: this.dataParser.parseParams(params) })
        .pipe(
          map(response => new PagebleDto({ ...response, DtoClass: a as new (responseItem) => T }))
        );
    }

    return super.get<PagebleDto<T>>(url, { params: this.dataParser.parseParams(params) })
      .pipe(
        map(response => new PagebleDto({ ...response, converFunction: a as (responseItem) => T }))
      );
  }

  update<T, P = unknown>(
    url: string,
    body: P,
    DtoClass?: new (responseValue) => T
  ): Observable<T> {
    return super.put<T>(url, body)
      .pipe(
        map(response => DtoClass ? new DtoClass(response) : response)
      );
  }

  updateMany<T, P = unknown>(
    url: string,
    body: P,
    DtoClass?: new (responseValue) => T
  ): Observable<Array<T>> {
    return super.put<Array<T>>(url, body)
      .pipe(
        map(response => DtoClass ? response.map(dto => new DtoClass(dto)) : response)
      );
  }

  partialUpdate<T, P = unknown>(
    url: string,
    body: P,
    requestOptions: RequestOptions<T>
  ): Observable<T> {
    return super.patch<T>(url, body)
      .pipe(
        map(response => requestOptions.DtoClass ? new requestOptions.DtoClass(response) : response)
      );
  }

  create<T, P = unknown>(
    url: string,
    body: P,
    DtoClass?: new (responseValue) => T
  ): Observable<T> {
    return super.post<T>(url, body)
      .pipe(
        map(response => DtoClass ? new DtoClass(response) : response)
      );
  }

  createMany<T, P = unknown>(
    url: string,
    body: P,
    DtoClass?: new (responseValue) => T
  ): Observable<Array<T>> {
    return super.post<Array<T>>(url, body)
      .pipe(
        map(response => DtoClass ? response.map(dto => new DtoClass(dto)) : response)
      );
  }

  silentCreate<T, P = unknown>(
    url: string,
    body: P,
    DtoClass?: new (responseValue) => T,
  ): Observable<T> {
    return super.post<T>(url, body)
      .pipe(
        map(response => DtoClass ? new DtoClass(response) : response)
      );
  }

  remove<T>(
    url: string,
    params?: Params
  ): Observable<T> {
    return super.delete<T>(url, { params: this.dataParser.parseParams(params) });
  }
}
