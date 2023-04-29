import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortTvShowDto } from './_types/short-tv-show.dto';

@Injectable()
export class TvShowsService {
  path = 'api/tv';

  constructor(private http: HttpService) { }

  getTrending(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.http.getAllWithPagination<ShortTvShowDto>(
      'api/trending/tv/week',
      params,
      ShortTvShowDto,
    );
  }

  getPopular(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.http.getAllWithPagination<ShortTvShowDto>(
      `${this.path}/popular`,
      params,
      ShortTvShowDto,
    );
  }

  getTopRated(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.http.getAllWithPagination<ShortTvShowDto>(
      `${this.path}/top_rated`,
      params,
      ShortTvShowDto,
    );
  }

  getCurrentlyAiring(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.http.getAllWithPagination<ShortTvShowDto>(
      `${this.path}/on_the_air`,
      params,
      ShortTvShowDto,
    );
  }

  getAiringToday(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.http.getAllWithPagination<ShortTvShowDto>(
      `${this.path}/airing_today`,
      params,
      ShortTvShowDto,
    );
  }
}
