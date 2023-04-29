/* eslint-disable @typescript-eslint/ban-types */
import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MoviesService } from '@rest/movies/movies.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';

import { AllowedNames } from '@core/types/allowed-names.type';
import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';
import { CategoryServices } from './_types/category-services.type';
import { AllowedServicesMethods } from './_types/allowed-services-methods.type';

import { CategoriesEnum } from './_data/categories.enum';

import { CATEGORY_TITLES } from './_data/category-titles';

@Injectable()
export class CategoriesService {
  SERVICES: CategoryServices = {
    [MediaTypesEnum.MOVIE]: this.moviesSevice,
    [MediaTypesEnum.TV]: this.tvShowsService
  };

  CATEGORY_METHODS: AllowedServicesMethods = {
    [MediaTypesEnum.MOVIE]: new Map<CategoriesEnum, AllowedNames<MoviesService, Function>>([
      [CategoriesEnum.Trending, 'getTrending'],
      [CategoriesEnum.Popular, 'getPopular'],
      [CategoriesEnum.TopRated, 'getTopRated'],
      [CategoriesEnum.Upcoming, 'getUpcoming'],
      [CategoriesEnum.NowPlaying, 'getNowPlaying'],
    ]),
    [MediaTypesEnum.TV]: new Map<CategoriesEnum, AllowedNames<TvShowsService, Function>>([
      [CategoriesEnum.Trending, 'getTrending'],
      [CategoriesEnum.Popular, 'getPopular'],
      [CategoriesEnum.TopRated, 'getTopRated'],
      [CategoriesEnum.CurrentlyAiring, 'getCurrentlyAiring'],
      [CategoriesEnum.AiringToday, 'getAiringToday'],
    ])
  };

  constructor(
    private moviesSevice: MoviesService, 
    private tvShowsService: TvShowsService
  ) {}

  getTitle(mediaType: MediaTypesEnum, categoryType: CategoriesEnum): string {
    return CATEGORY_TITLES[mediaType].get(categoryType);
  }

  getData(mediaType: MediaTypesEnum, categoryType: CategoriesEnum, params?: Params): Observable<PagebleDto<any>> {
    const service = this.SERVICES[mediaType];
    const methodName = this.CATEGORY_METHODS[mediaType].get(categoryType);
    return service[methodName](params);
  }
}
