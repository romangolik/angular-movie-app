import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortMovieDto } from './_types/short-movie.dto';

@Injectable()
export class MoviesService {
  path = 'api/movie';

  constructor(private http: HttpService) { }

  getTrending(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this.http.getAllWithPagination<ShortMovieDto>(
      'api/trending/movie/week',
      params,
      ShortMovieDto,
    );
  }

  getPopular(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this.http.getAllWithPagination<ShortMovieDto>(
      `${this.path}/popular`,
      params,
      ShortMovieDto,
    );
  }

  getTopRated(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this.http.getAllWithPagination<ShortMovieDto>(
      `${this.path}/top_rated`,
      params,
      ShortMovieDto,
    );
  }

  getUpcoming(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this.http.getAllWithPagination<ShortMovieDto>(
      `${this.path}/upcoming`,
      params,
      ShortMovieDto,
    );
  }

  getNowPlaying(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this.http.getAllWithPagination<ShortMovieDto>(
      `${this.path}/now_playing`,
      params,
      ShortMovieDto,
    );
  }
}
