import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';
import { MoviesListFacade } from './movies-list.facade';

import { CarouselModule } from '@components/shared/carousel/carousel.module';
import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { HeroSliderModule } from '@components/shared/hero-slider/hero-slider.module';
import { MoviesListlRouting } from './movies-list.routing';

import { MoviesListComponent } from './movies-list.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MediaCardModule,
    HeroSliderModule,
    MoviesListlRouting,
  ],
  declarations: [ MoviesListComponent ],
  exports: [ MoviesListComponent ],
  providers: [ 
    MoviesService,
    GenresService,
    MoviesListFacade,
  ]
})
export class MoviesListModule { }
