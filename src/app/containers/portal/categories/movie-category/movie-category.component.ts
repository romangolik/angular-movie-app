import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { switchMap, takeUntil } from 'rxjs';

import { MoviesService } from '@rest/movies/movies.service';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';

import { MediaTypesEnum } from '@core/enums/media-types.enum';

import { BaseCategoryComponent } from '@core/basic-classes/base-category.component';

import { MOVIE_CATEGORY_TITLES } from './_data/movie-category-titles';

@Component({
  selector: 'app-movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.scss']
})
export class MovieCategoryComponent extends BaseCategoryComponent<ShortMovieDto> implements OnInit, OnDestroy {
  categoryTitles = MOVIE_CATEGORY_TITLES;

  constructor(
    private moviesService: MoviesService,
    public activatedRoute: ActivatedRoute,
  ) {
    super(MediaTypesEnum.MOVIE, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(({categoryType}) => this.moviesService.getDataByCategory(categoryType))
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

    this.moviesService.getDataByCategory(
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
