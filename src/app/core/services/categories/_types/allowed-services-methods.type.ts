/* eslint-disable @typescript-eslint/ban-types */
import { MoviesService } from '@rest/movies/movies.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { AllowedNames } from '@core/types/allowed-names.type';

import { CategoriesEnum } from '../_data/categories.enum';
import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';

export type AllowedServicesMethods = {
  [MediaTypesEnum.MOVIE]: Map<CategoriesEnum, AllowedNames<MoviesService, Function>>,
  [MediaTypesEnum.TV]: Map<CategoriesEnum, AllowedNames<TvShowsService, Function>>,
}