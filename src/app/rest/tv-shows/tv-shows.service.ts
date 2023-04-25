import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { MediaDto } from '@rest/media/_types/media.dto';
import { PagebleDto } from '@core/http/_types/pageble-response.dto';

@Injectable()
export class TvShowsService {
  path = 'api/tv';

  constructor(private http: HttpService) { }

  getTrending(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      'api/trending/tv/week',
      params,
      MediaDto,
    );
  }

  getPopular(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      `${this.path}/popular`,
      params,
      MediaDto,
    );
  }

  getTopRated(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      `${this.path}/top_rated`,
      params,
      MediaDto,
    );
  }

  getCurrentlyAiring(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      `${this.path}/on_the_air`,
      params,
      MediaDto,
    );
  }

  getAiringToday(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      `${this.path}/airing_today`,
      params,
      MediaDto,
    );
  }
}
