import { GenreDto } from '@rest/genres/_types/genre.dto';

import { MediaTypesEnum } from '../enums/media-types.enum';

export interface IMedia {
  backdrop_path: string;
  genre_ids: number[];
  genres: GenreDto[];
  id: number;
  media_type: MediaTypesEnum;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}