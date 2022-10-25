import { GenreDto } from '@rest/genres/_types/genre.dto';

interface IMovieDto {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenreDto[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export class MovieDto {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenreDto[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  constructor(data: IMovieDto) {
    this.adult = data.adult;
    this.backdrop_path = data.backdrop_path;
    this.genre_ids = data.genre_ids;
    this.genres = data.genres;
    this.id = data.id;
    this.original_language = data.original_language;
    this.original_title = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.poster_path = data.poster_path;
    this.release_date = data.release_date;
    this.title = data.title;
    this.video = data.video;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
  }
}
