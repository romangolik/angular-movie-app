import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CATEGORY_TITLES } from '@core/services/categories/_data/category-titles';
import { CategoriesService } from '@core/services/categories/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesSevice: CategoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      const { mediaType, categoryType } = data;

      this.title = CATEGORY_TITLES[mediaType].get(categoryType);

      this.categoriesSevice.getData(mediaType, categoryType).subscribe(i => console.log(i));
    });
  }
}
