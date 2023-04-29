import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';

@Injectable()
export class MoviesListFacade {
  constructor(
    private moviesService: MoviesService,
    private genresService: GenresService,
  ) {}

  getTrending(params?: Params): Observable<ShortMovieDto[]> {
    return this.moviesService.getTrending({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(
      map(data => data.results),
      switchMap(
        movies => this.genresService.getMovieList().pipe(
          map(allGenres => movies.map(movie => ({
            ...movie,
            genres: this.genresService.getByIds(movie.genre_ids, allGenres)
          })))
        )
      )
    );
  }

  getPopular(params?: Params): Observable<ShortMovieDto[]> {
    return this.moviesService.getPopular({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }

  getTopRated(params?: Params): Observable<ShortMovieDto[]> {
    return this.moviesService.getTopRated({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }

  getUpcoming(params?: Params): Observable<ShortMovieDto[]> {
    return this.moviesService.getUpcoming({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }

  getNowPlaying(params?: Params): Observable<ShortMovieDto[]> {
    return this.moviesService.getNowPlaying({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }
}
