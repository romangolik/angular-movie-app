import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeroModule } from '../hero/hero.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { HeroSliderComponent } from './hero-slider.component';

@NgModule({
  imports: [
    HeroModule,
    CommonModule,
    RouterModule,
    GetImageLinkModule
  ],
  declarations: [ HeroSliderComponent ],
  exports: [ HeroSliderComponent ]
})
export class HeroSliderModule { }
