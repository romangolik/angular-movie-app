import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GenresService } from '@rest/genres/genres.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

@Injectable()
export class TvListFacade {
  constructor(
    private genresService: GenresService,
    private tvShowsService: TvShowsService,
  ) {}

  getTrending(params?: Params): Observable<ShortTvShowDto[]> {
    return this.tvShowsService.getTrending({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(
      map(data => data.results),
      switchMap(
        movies => this.genresService.getTVList().pipe(
          map(allGenres => movies.map(movie => ({
            ...movie,
            genres: this.genresService.getByIds(movie.genre_ids, allGenres)
          })))
        )
      )
    );
  }

  getPopular(params?: Params): Observable<ShortTvShowDto[]> {
    return this.tvShowsService.getPopular({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }

  getTopRated(params?: Params): Observable<ShortTvShowDto[]> {
    return this.tvShowsService.getTopRated({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }

  getCurrentlyAiring(params?: Params): Observable<ShortTvShowDto[]> {
    return this.tvShowsService.getCurrentlyAiring({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }

  getAiringToday(params?: Params): Observable<ShortTvShowDto[]> {
    return this.tvShowsService.getAiringToday({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(map(data => data.results));
  }
}
