import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GetImageLinkPipe } from '@core/pipes/get-image-link.pipe';
import { HeroSliderComponent } from './hero-slider.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    GetImageLinkPipe,
    HeroSliderComponent
  ],
  exports: [ HeroSliderComponent ]
})
export class HeroSliderModule { }
