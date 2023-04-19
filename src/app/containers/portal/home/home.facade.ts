import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { MediaDto } from '@rest/media/_types/media.dto';
import { GenreDto } from '@rest/genres/_types/genre.dto';

@Injectable()
export class HomeFacade {
  constructor(
    private moviesService: MoviesService,
    private genresService: GenresService,
    private tvShowsService: TvShowsService
  ) {}

  getTrendingMovies(params?: Params): Observable<MediaDto[]> {
    return this.moviesService.getTrending({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(
      switchMap(
        data => this.genresService.getAll()
          .pipe(
            map(allGenres => data.results.map(movie => new MediaDto({
                ...movie,
                genres: this.getMovieGenres(movie.genre_ids, allGenres)
              }))
            )
          )
      )
    );
  }

  getTrendingTvShows(params?: Params): Observable<MediaDto[]> {
    return this.tvShowsService.getTrending({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(
      switchMap(
        data => this.genresService.getAll()
          .pipe(
            map(allGenres => data.results.map(tvShows => new MediaDto({
                ...tvShows,
                genres: this.getMovieGenres(tvShows.genre_ids, allGenres)
              }))
            )
          )
      )
    );
  }

  getMovieGenres(genreIds: number[], genres: GenreDto[]): GenreDto[] {
    return genres.filter(genre => genreIds.includes(genre.id));
  }
}
