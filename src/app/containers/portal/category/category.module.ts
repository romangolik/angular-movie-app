import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesService } from '@core/services/categories/categories.service';

import { CategoryRouting } from './category.routing';

import { CategoryComponent } from './category.component';
import { MoviesService } from '@rest/movies/movies.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

@NgModule({
  imports: [
    CommonModule,
    CategoryRouting
  ],
  declarations: [ CategoryComponent ],
  exports: [ CategoryComponent ],
  providers: [ CategoriesService, MoviesService, TvShowsService ]
})
export class CategoryModule { }
