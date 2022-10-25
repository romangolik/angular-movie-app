import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { concatMap, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';

import { MovieDto } from '@rest/movies/_types/movie.dto';
import { GenreDto } from '@rest/genres/_types/genre.dto';

@Injectable()
export class HomeFacade {
  constructor(
    private moviesService: MoviesService,
    private genresService: GenresService
  ) {}

  getPopular(params?: Params): Observable<MovieDto[]> {
    return this.moviesService.getPopular({
      'language': 'en-US',
      'page': '1',
      ...params
    }).pipe(
      concatMap(
        data => this.genresService.getAll()
          .pipe(
            map(genres => data.results.map(movie => new MovieDto({
                ...movie,
                genres: this.getMovieGenres(movie.genre_ids, genres)
              }))
            ),
            map(movies => [movies[0], movies[1], movies[2], movies[3], movies[4]])
          )
      ),

    );
  }

  getMovieGenres(genreIds: number[], genres: GenreDto[]): GenreDto[] {
    return genres.filter(genre => genreIds.includes(genre.id));
  }
}
