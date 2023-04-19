import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouting } from './home.routing';

import { HomeFacade } from '@portal/home/home.facade';
import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { CarouselModule } from '@components/shared/carousel/carousel.module';
import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { HeroSliderModule } from '@components/shared/hero-slider/hero-slider.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeRouting,
    CommonModule,
    CarouselModule,
    MediaCardModule,
    HeroSliderModule,
    GetImageLinkModule,
  ],
  declarations: [ HomeComponent ],
  providers: [
    HomeFacade,
    MoviesService,
    GenresService,
    TvShowsService
  ]
})
export class HomeModule { }
