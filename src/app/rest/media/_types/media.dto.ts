import { GenreDto } from '@rest/genres/_types/genre.dto';

import { MediaTypesEnum } from '../_data/media-types.enum';

interface IMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenreDto[];
  id: number;
  media_type: MediaTypesEnum;
  original_language: string;
  original_title?: string;
  original_name?: string;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export class MediaDto implements IMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenreDto[];
  id: number;
  media_type: MediaTypesEnum;
  original_language: string;
  original_title: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  constructor(data: IMedia) {
    this.adult = data.adult;
    this.backdrop_path = data.backdrop_path;
    this.genre_ids = data.genre_ids;
    this.genres = data.genres;
    this.id = data.id;
    this.media_type = data.media_type;
    this.original_language = data.original_language;
    this.original_title = data.original_title || data.original_name;
    this.title = data.title || data.name;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.poster_path = data.poster_path;
    this.release_date = data.release_date;
    this.video = data.video ?? false;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
  }
}