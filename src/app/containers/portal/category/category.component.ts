import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '@core/services/categories/categories.service';

import { MediaDto } from '@rest/media/_types/media.dto';
import { PagebleDto } from '@core/http/_types/pageble-response.dto';

import { MediaTypesEnum } from '@rest/media/_types/media-types.enum';
import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  title = '';
  currentPage = 1;
  canLoadMore = false;
  
  mediaList: MediaDto[];
  mediaType: MediaTypesEnum;
  categoryType: CategoriesEnum;
  categoryData: PagebleDto<MediaDto>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesSevice: CategoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(routeData => {
      const { mediaType, categoryType } = routeData;
      this.mediaType = mediaType;
      this.categoryType = categoryType;

      this.title = this.categoriesSevice.getTitle(mediaType, categoryType);

      this.categoriesSevice.getData(mediaType, categoryType)
        .subscribe(data => {
          this.categoryData = data;
          this.mediaList = data.results;
          this.canLoadMore = this.currentPage !== data.total_pages;
        });
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
    ).subscribe(data => {
      this.mediaList = this.mediaList.concat(data.results);
      this.canLoadMore = this.currentPage !== data.total_pages;
    });
  }
}
