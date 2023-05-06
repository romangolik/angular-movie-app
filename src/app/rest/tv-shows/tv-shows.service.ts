import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortTvShowDto } from './_types/short-tv-show.dto';

import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

@Injectable()
export class TvShowsService {
  path = 'api/tv';

  constructor(private http: HttpService) { }

  getDataByCategory(category: CategoriesEnum, params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    const ENDPOINTS = {
      [CategoriesEnum.Trending]: 'api/trending/tv/week',
      [CategoriesEnum.Popular]: `${this.path}/popular`,
      [CategoriesEnum.TopRated]: `${this.path}/top_rated`,
      [CategoriesEnum.CurrentlyAiring]: `${this.path}/on_the_air`,
      [CategoriesEnum.AiringToday]: `${this.path}/airing_today`,
    };

    return this.http.getAllWithPagination<ShortTvShowDto>(
      ENDPOINTS[category],
      params,
      ShortTvShowDto
    );
  }

  getTrending(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.getDataByCategory(CategoriesEnum.Trending, params);
  }

  getPopular(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.getDataByCategory(CategoriesEnum.Popular, params);
  }

  getTopRated(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.getDataByCategory(CategoriesEnum.TopRated, params);
  }

  getCurrentlyAiring(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.getDataByCategory(CategoriesEnum.CurrentlyAiring, params);
  }

  getAiringToday(params?: Params): Observable<PagebleDto<ShortTvShowDto>> {
    return this.getDataByCategory(CategoriesEnum.AiringToday, params);
  }
}
