import { GenreDto } from '@rest/genres/_types/genre.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';

interface IShortTvShow {
  poster_path: string | null;
  popularity: number;
  id: number;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  media_type: MediaTypesEnum.TV;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  genres: GenreDto[];
  original_language: string;
  vote_count: number;
  original_name: string;
  name: string;
}

export class ShortTvShowDto implements IShortTvShow {
  poster_path: string | null;
  popularity: number;
  id: number;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  media_type: MediaTypesEnum.TV;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  genres: GenreDto[];
  original_language: string;
  vote_count: number;
  original_name: string;
  name: string;

  constructor(data: IShortTvShow) {
    this.poster_path = data.poster_path ?? null;
    this.popularity = data.popularity;
    this.id = data.id;
    this.overview = data.overview;
    this.backdrop_path = data.backdrop_path ?? null;
    this.vote_average = data.vote_average;
    this.media_type = MediaTypesEnum.TV;
    this.first_air_date = data.first_air_date;
    this.origin_country = data.origin_country ?? [];
    this.genre_ids = data.genre_ids;
    this.genres = data.genres;
    this.original_language = data.original_language;
    this.vote_count = data.vote_count;
    this.original_name = data.original_name;
    this.name = data.name;
  }
}