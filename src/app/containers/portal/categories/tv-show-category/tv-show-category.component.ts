import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, switchMap, takeUntil } from 'rxjs';

import { TvShowsService } from '@rest/tv-shows/tv-shows.service';
import { CategoriesService } from '@core/services/categories/categories.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';
import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

@Component({
  selector: 'app-tv-show-category',
  templateUrl: './tv-show-category.component.html',
  styleUrls: ['./tv-show-category.component.scss']
})
export class TvShowCategoryComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();

  title = '';
  currentPage = 1;
  canLoadMore = false;
  
  mediaList: ShortTvShowDto[];
  categoryType: CategoriesEnum;
  categoryData: PagebleDto<ShortTvShowDto>;

  constructor(
    private tvShowsService: TvShowsService,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.$destroy),
      switchMap(({categoryType}) => {
        this.categoryType = categoryType;
        this.title = this.categoriesService.getTitle(MediaTypesEnum.TV, categoryType);

        return this.tvShowsService.getDataByCategory(categoryType);
      }))
      .subscribe(data => {
        this.categoryData = data;
        this.mediaList = data.results;
        this.canLoadMore = this.currentPage !== data.total_pages;
    });
  }

  trackBy(index: number, item: ShortTvShowDto): number {
    return item.id;
  }

  loadMore(): void {
    this.currentPage++;
    const params = {
      page: this.currentPage
    };

    this.tvShowsService.getDataByCategory(
      this.categoryType,
      params
    ).pipe(takeUntil(this.$destroy))
      .subscribe(data => {
        this.mediaList = this.mediaList.concat(data.results);
        this.canLoadMore = this.currentPage !== data.total_pages;
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
