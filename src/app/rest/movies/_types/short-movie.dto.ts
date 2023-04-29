import { IMedia } from '@rest/media/_types/media.interface';

import { GenreDto } from '@rest/genres/_types/genre.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';

interface IShortMovie extends IMedia {
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  media_type: MediaTypesEnum.MOVIE;
  title: string;
  video: boolean;
}

export class ShortMovieDto implements IShortMovie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  genre_ids: number[];
  genres: GenreDto[];
  id: number;
  media_type: MediaTypesEnum.MOVIE;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;

  constructor(data: IShortMovie) {
    this.poster_path = data.poster_path ?? null;
    this.adult = data.adult;
    this.overview = data.overview;
    this.release_date = data.release_date;
    this.original_title = data.original_title;
    this.genre_ids = data.genre_ids;
    this.genres = data.genres;
    this.id = data.id;
    this.media_type = MediaTypesEnum.MOVIE;
    this.original_language = data.original_language;
    this.title = data.title;
    this.backdrop_path = data.backdrop_path ?? null;
    this.popularity = data.popularity;
    this.vote_count = data.vote_count;
    this.video = data.video ?? false;
    this.vote_average = data.vote_average;
  }
}