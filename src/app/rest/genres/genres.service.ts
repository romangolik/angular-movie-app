import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { GenreDto } from '@rest/genres/_types/genre.dto';

const STORAGE_KEY = 'genres'; 

@Injectable()
export class GenresService {
  path = 'api/genre/movie/list';

  constructor(private http: HttpService) { }

  getAll(params?: Params): Observable<GenreDto[]> {
    const lodalStorageData = localStorage.getItem(STORAGE_KEY);

    if (lodalStorageData) {
      return of(JSON.parse(lodalStorageData).map(genre => new GenreDto(genre)));
    }

    return this.http.getAll<GenreDto>(
      this.path,
      params,
      GenreDto,
      'genres'
    ).pipe(tap(genres => localStorage.setItem(STORAGE_KEY, JSON.stringify(genres))));
  }
}
