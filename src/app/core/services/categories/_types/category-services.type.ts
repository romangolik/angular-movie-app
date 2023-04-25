import { MoviesService } from '@rest/movies/movies.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { MediaTypesEnum } from '@rest/media/_types/media-types.enum';

export type CategoryServices = {
  [MediaTypesEnum.MOVIE]: MoviesService,
  [MediaTypesEnum.TV]: TvShowsService,
};