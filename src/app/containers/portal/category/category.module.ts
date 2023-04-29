import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesService } from '@rest/movies/movies.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';
import { CategoriesService } from '@core/services/categories/categories.service';

import { MediaListModule } from '@components/shared/media-list/media-list.module';
import { CategoryRouting } from './category.routing';

import { CategoryComponent } from './category.component';

@NgModule({
  imports: [
    CommonModule,
    MediaListModule,
    CategoryRouting,
  ],
  declarations: [ CategoryComponent ],
  exports: [ CategoryComponent ],
  providers: [ 
    MoviesService,
    TvShowsService,
    CategoriesService, 
  ]
})
export class CategoryModule { }
