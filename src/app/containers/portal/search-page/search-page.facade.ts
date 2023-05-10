import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SearchService } from '@rest/search/search.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';

import { SearchResult } from './_types/search-result.type';

@Injectable()
export class SearchPageFacade {
  constructor(
    private searchService: SearchService
  ) {}

  isSearchResultEmpty = false;

  search(params?: Params): Observable<PagebleDto<SearchResult>> {
    return this.searchService.search(params).pipe(
      switchMap(pagebleData => {
        this.isSearchResultEmpty = !pagebleData.results.length;
        return this.isSearchResultEmpty ? this.searchService.trending(params) : of(pagebleData);
      })
    );
  }
}
