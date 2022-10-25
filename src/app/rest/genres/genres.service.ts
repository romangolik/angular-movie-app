import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { GenreDto } from '@rest/genres/_types/genre.dto';

@Injectable()
export class GenresService {
  path = 'api/genre/movie/list'

  constructor(private http: HttpService) { }

  getAll(params?: Params): Observable<GenreDto[]> {
    return this.http.getAll<GenreDto>(
      this.path,
      params,
      GenreDto,
      'genres'
    );
  }
}
