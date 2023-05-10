import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortMovieDto } from './_types/short-movie.dto';

import { CategoriesEnum } from '@core/enums/categories.enum';

@Injectable()
export class MoviesService {
  path = 'api/movie';

  constructor(private http: HttpService) { }

  getDataByCategory(category: CategoriesEnum, params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    const ENDPOINTS = {
      [CategoriesEnum.Trending]: 'api/trending/movie/week',
      [CategoriesEnum.Popular]: `${this.path}/popular`,
      [CategoriesEnum.TopRated]: `${this.path}/top_rated`,
      [CategoriesEnum.Upcoming]: `${this.path}/upcoming`,
      [CategoriesEnum.NowPlaying]: `${this.path}/now_playing`,
    };

    return this.http.getAllWithPagination<ShortMovieDto>(
      ENDPOINTS[category],
      params,
      ShortMovieDto
    );
  }

  getTrending(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this,this.getDataByCategory(CategoriesEnum.Trending, params);
  }

  getPopular(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this,this.getDataByCategory(CategoriesEnum.Popular, params);
  }

  getTopRated(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this,this.getDataByCategory(CategoriesEnum.TopRated, params);
  }

  getUpcoming(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this,this.getDataByCategory(CategoriesEnum.Upcoming, params);
  }

  getNowPlaying(params?: Params): Observable<PagebleDto<ShortMovieDto>> {
    return this,this.getDataByCategory(CategoriesEnum.NowPlaying, params);
  }
}
