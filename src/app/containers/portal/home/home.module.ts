import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouting } from './home.routing';

import { HomeFacade } from '@portal/home/home.facade';
import { MoviesService } from '@rest/movies/movies.service';
import { GenresService } from '@rest/genres/genres.service';

import { HeroSliderModule } from '@components/shared/hero-slider/hero-slider.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeRouting,
    CommonModule,
    HeroSliderModule,
    GetImageLinkModule
  ],
  declarations: [ HomeComponent ],
  providers: [
    HomeFacade,
    MoviesService,
    GenresService
  ]
})
export class HomeModule { }
