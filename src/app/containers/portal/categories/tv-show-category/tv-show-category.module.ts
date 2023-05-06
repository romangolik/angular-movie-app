import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { MediaListModule } from '@components/shared/media-list/media-list.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';
import { TvShowCategoryRouting } from './tv-show-category.routing';

import { TvShowCategoryComponent } from './tv-show-category.component';

@NgModule({
  imports: [
    CommonModule,
    MediaListModule,
    MediaCardModule,
    GetImageLinkModule,
    TvShowCategoryRouting,
  ],
  declarations: [ TvShowCategoryComponent ],
  exports: [ TvShowCategoryComponent ],
  providers: [ TvShowsService ]
})
export class TvShowCategoryModule { }
