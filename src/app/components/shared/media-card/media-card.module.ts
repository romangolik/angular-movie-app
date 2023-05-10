import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { MediaCardComponent } from './media-card.component';
import { MediaCardHeading, MediaCardImage, MediaCardParagraph } from './directives/media-card-sections.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GetImageLinkModule
  ],
  declarations: [ 
    MediaCardImage,
    MediaCardHeading,
    MediaCardParagraph,
    MediaCardComponent,
  ],
  exports: [ 
    MediaCardImage,
    MediaCardHeading,
    MediaCardParagraph,
    MediaCardComponent,
  ]
})
export class MediaCardModule { }
