import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { MediaCardComponent } from './media-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GetImageLinkModule
  ],
  declarations: [ MediaCardComponent ],
  exports: [ MediaCardComponent ]
})
export class MediaCardModule { }
