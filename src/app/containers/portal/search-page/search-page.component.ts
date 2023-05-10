import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, switchMap, takeUntil } from 'rxjs';

import { SearchPageFacade } from './search-page.facade';
import { QueryParamsService } from '@core/services/query/query-params.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortPersonDto } from '@rest/persons/_type/short-person.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { SearchResult } from './_types/search-result.type';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  data: SearchResult[];
  pagebleData: PagebleDto<SearchResult>;

  searchValue = '';
  canLoadMore = true;
  isSearchResultEmpty = false;

  ShortMovieDto = ShortMovieDto;
  ShortTvShowDto = ShortTvShowDto;
  ShortPersonDto = ShortPersonDto;

  constructor(
    public searchPageFacade: SearchPageFacade,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParamsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap(params => {
          this.searchValue = params.query ?? '';
          return this.searchPageFacade.search(params);
        }),
      )
      .subscribe(pagebleData => {
        this.isSearchResultEmpty = this.searchPageFacade.isSearchResultEmpty;
        this.data = pagebleData.results;
        this.setCurrentData(pagebleData);
      });
  }

  trackBy(index: number, item: SearchResult): number {
    return item.id || index;
  }

  setCurrentData(pagebleData: PagebleDto<SearchResult>): void {
    this.pagebleData = pagebleData;
    this.canLoadMore = pagebleData.page !== pagebleData.total_pages;
  }

  setSearchValue(value: string): void {
    this.searchValue = value.trim();
    this.navigateWithSearchQuery();
  }

  resetSearch(): void {
    this.setSearchValue('');
  }

  loadMore(): void {
    const params = {
      page: this.pagebleData.page + 1,
      query: this.searchValue
    };

    this.searchPageFacade.search(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(pagebleData => {
        this.data = this.data.concat(pagebleData.results);
        this.setCurrentData(pagebleData);
      });
  }

  navigateWithSearchQuery(): void {
    this.queryParamsService.addQueryParams({
      query: this.searchValue.length > 0 ? this.searchValue : null,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
