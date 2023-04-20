import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';

import { MediaDto } from '@rest/media/_types/media.dto';

@Injectable()
export class HomeFacade {
  constructor(
    private moviesService: MoviesService,
    private genresService: GenresService,
  ) {}

  getTrendingMovies(params?: Params): Observable<MediaDto[]> {
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
}
