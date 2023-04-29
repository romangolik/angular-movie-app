import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { GenreDto } from '@rest/genres/_types/genre.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';
import { GenresStorageKeysEnum } from './_data/genres-storage-keys.enum';

@Injectable()
export class GenresService {
  path = 'api/genre';

  constructor(private http: HttpService) { }

  private getAllByMediaType(
    mediaType: MediaTypesEnum, 
    storegeKey: GenresStorageKeysEnum, 
    params?: Params
  ): Observable<GenreDto[]> {
    const localStorageData = localStorage.getItem(storegeKey);

    if (localStorageData) {
      return of(JSON.parse(localStorageData).map(genre => new GenreDto(genre)));
    }

    return this.http.getAll<GenreDto>(
      `${this.path}/${mediaType}/list`,
      params,
      GenreDto,
      'genres'
    ).pipe(
        tap(genres => localStorage.setItem(storegeKey, JSON.stringify(genres)))
      );
  }

  getMovieList(params?: Params): Observable<GenreDto[]> {
    return this.getAllByMediaType(MediaTypesEnum.MOVIE, GenresStorageKeysEnum.MOVIE, params);
  }

  getTVList(params?: Params): Observable<GenreDto[]> {
    return this.getAllByMediaType(MediaTypesEnum.TV, GenresStorageKeysEnum.TV, params);
  }

  getByIds(ids: number[], allGenres: GenreDto[]): GenreDto[] {
    return allGenres.filter(genre => ids.includes(genre.id));
  }
}
