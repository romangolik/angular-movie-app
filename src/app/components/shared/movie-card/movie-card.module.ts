import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { MovieCardComponent } from './movie-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GetImageLinkModule
  ],
  declarations: [ MovieCardComponent ],
  exports: [ MovieCardComponent ]
})
export class MovieCardModule { }
