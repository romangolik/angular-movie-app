import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortPersonDto } from '@rest/persons/_type/short-person.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { SearchResult } from '@portal/search-page/_types/search-result.type';

import { MediaTypesEnum } from '@core/enums/media-types.enum';


@Injectable()
export class SearchService {
  constructor(private http: HttpService) {}

  search(params?: Params): Observable<PagebleDto<SearchResult>> {
    return this.http.getAllWithPagination<SearchResult>(
      'api/search/multi',
      params,
      item => {
        switch (item.media_type) {
          case MediaTypesEnum.MOVIE:
            return new ShortMovieDto(item);
            break;
          case MediaTypesEnum.TV:
            return new ShortTvShowDto(item);
            break;
          case MediaTypesEnum.PERSON:
            return new ShortPersonDto(item);
            break;
        }
      }
    );
  }
}
