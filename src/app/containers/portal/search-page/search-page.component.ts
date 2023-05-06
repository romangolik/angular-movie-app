import { Component, OnInit } from '@angular/core';

import { SearchService } from '@rest/search/search.service';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortPersonDto } from '@rest/persons/_type/short-person.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { SearchResult } from './_types/search-result.type';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  data: SearchResult[];

  canLoadMore = false;
  ShortMovieDto = ShortMovieDto;
  ShortTvShowDto = ShortTvShowDto;
  ShortPersonDto = ShortPersonDto;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.search({ query: 'robert' }).subscribe(data => this.data = data.results);
  }

  trackBy(index: number, item: SearchResult): number {
    return item.id || index;
  }
}
