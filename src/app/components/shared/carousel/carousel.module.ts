import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonCardModule } from '../skeleton-card/skeleton-card.module';

import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  imports: [
    CommonModule,
    SkeletonCardModule,
  ],
  declarations: [ 
    CarouselComponent, 
    CarouselItemComponent 
  ],
  exports: [ 
    CarouselComponent,
    CarouselItemComponent
  ]
}) 
export class CarouselModule { }
