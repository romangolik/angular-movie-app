import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, switchMap, takeUntil } from 'rxjs';

import { MoviesService } from '@rest/movies/movies.service';
import { CategoriesService } from '@core/services/categories/categories.service';

import { PagebleDto } from '@core/http/_types/pageble-response.dto';
import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';
import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

@Component({
  selector: 'app-movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.scss']
})
export class MovieCategoryComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();

  title = '';
  currentPage = 1;
  canLoadMore = false;
  
  mediaList: ShortMovieDto[];
  categoryType: CategoriesEnum;
  categoryData: PagebleDto<ShortMovieDto>;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.$destroy),
      switchMap(({categoryType}) => {
        this.categoryType = categoryType;
        this.title = this.categoriesService.getTitle(MediaTypesEnum.MOVIE, categoryType);

        return this.moviesService.getDataByCategory(categoryType);
      }))
      .subscribe(data => {
        this.categoryData = data;
        this.mediaList = data.results;
        this.canLoadMore = this.currentPage !== data.total_pages;
    });
  }

  trackBy(index: number, item: ShortMovieDto): number {
    return item.id;
  }

  loadMore(): void {
    this.currentPage++;
    const params = {
      page: this.currentPage
    };

    this.moviesService.getDataByCategory(
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
