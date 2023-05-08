import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, take } from 'rxjs';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';

import { MediaTypesEnum } from '@core/enums/media-types.enum';
import { CategoriesEnum } from '@core/enums/categories.enum';

@Component({
  selector: 'app-base-list',
  template: '',
})
export abstract class BaseCategoryComponent<T extends { id: number }> implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  title = '';
  canLoadMore = false;
  
  mediaList: T[];
  categoryType: CategoriesEnum;
  categoryData: PagebleDto<T>;
  categoryTitles: Map<CategoriesEnum, string>;

  constructor(
    public mediaType: MediaTypesEnum,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe(({categoryType}) => {
        this.categoryType = categoryType;
        this.title = this.categoryTitles.get(categoryType);
    });
  }

  trackBy(index: number, item: T): number {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}