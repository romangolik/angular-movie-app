import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesService } from '@rest/movies/movies.service';

import { MediaListModule } from '@components/shared/media-list/media-list.module';
import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';
import { MovieCategoryRouting } from './movie-category.routing';

import { MovieCategoryComponent } from './movie-category.component';
import { CategoriesService } from '@core/services/categories/categories.service';

@NgModule({
  imports: [
    CommonModule,
    MediaCardModule,
    MediaListModule,
    GetImageLinkModule,
    MovieCategoryRouting,
  ],
  declarations: [ MovieCategoryComponent ],
  exports: [ MovieCategoryComponent ],
  providers: [ MoviesService, CategoriesService ]
})
export class MovieCategoryModule { }
