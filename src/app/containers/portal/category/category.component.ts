import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, switchMap, takeUntil } from 'rxjs';

import { CategoriesService } from '@core/services/categories/categories.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';
import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();

  title = '';
  currentPage = 1;
  canLoadMore = false;
  
  mediaList: any[];
  mediaType: MediaTypesEnum;
  categoryType: CategoriesEnum;
  categoryData: PagebleDto<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesSevice: CategoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.$destroy),
      switchMap(({mediaType, categoryType}) => {
        this.mediaType = mediaType;
        this.categoryType = categoryType;

        this.title = this.categoriesSevice.getTitle(mediaType, categoryType);

        return this.categoriesSevice.getData(mediaType, categoryType);
      }))
      .subscribe(data => {
        this.categoryData = data;
        this.mediaList = data.results;
        this.canLoadMore = this.currentPage !== data.total_pages;
    });
  }

  loadMore(): void {
    this.currentPage++;
    const params = {
      page: this.currentPage
    };

    this.categoriesSevice.getData(
      this.mediaType, 
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
