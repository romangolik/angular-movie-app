import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvListFacade } from './tv-list.facade';
import { GenresService } from '@rest/genres/genres.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { CarouselModule } from '@components/shared/carousel/carousel.module';
import { TvListlRouting } from './tv-list.routing';
import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { HeroSliderModule } from '@components/shared/hero-slider/hero-slider.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { TvListComponent } from './tv-list.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    TvListlRouting,
    MediaCardModule,
    HeroSliderModule,
    GetImageLinkModule,
  ],
  declarations: [ TvListComponent ],
  exports: [ TvListComponent ],
  providers: [ 
    TvListFacade,
    GenresService,
    TvShowsService,
  ]
})
export class TvListModule { }
