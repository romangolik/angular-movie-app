import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { switchMap, takeUntil } from 'rxjs';

import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { MediaTypesEnum } from '@core/enums/media-types.enum';

import { BaseCategoryComponent } from '@core/basic-classes/base-category.component';

import { TV_SHOW_CATEGORY_TITLES } from './_data/tv-show-category-titles';

@Component({
  selector: 'app-tv-show-category',
  templateUrl: './tv-show-category.component.html',
  styleUrls: ['./tv-show-category.component.scss']
})
export class TvShowCategoryComponent extends BaseCategoryComponent<ShortTvShowDto> implements OnInit, OnDestroy {
  categoryTitles =TV_SHOW_CATEGORY_TITLES;

  constructor(
    private tvShowsService: TvShowsService,
    public activatedRoute: ActivatedRoute,
  ) {
    super(MediaTypesEnum.TV, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(({categoryType}) => this.tvShowsService.getDataByCategory(categoryType))
      )
      .subscribe(data => {
        this.categoryData = data;
        this.mediaList = data.results;
        this.canLoadMore = data.page !== data.total_pages;
      });
  }

  loadMore(): void {
    const params = {
      page: this.categoryData.page + 1
    };

    this.tvShowsService.getDataByCategory(
      this.categoryType,
      params
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.categoryData = data;
        this.mediaList = this.mediaList.concat(data.results);
        this.canLoadMore = data.page !== data.total_pages;
      });
  }
}
