import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { MovieDto } from '@rest/movies/_types/movie.dto';
import { PagebleDto } from '@core/http/_types/pageble-response.dto';

@Injectable()
export class MoviesService {
  path = 'api/movie';

  constructor(private http: HttpService) { }

  getPopular(params?: Params): Observable<PagebleDto<MovieDto>> {
    return this.http.getAllWithPagination<MovieDto>(
      `${this.path}/now_playing`,
      params,
      MovieDto,
    );
  }
}
