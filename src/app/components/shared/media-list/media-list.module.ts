import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaCardModule } from '../media-card/media-card.module';

import { MediaListComponent } from './media-list.component';

import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';
import { InstanceofModule } from '@core/pipes/instanceof/instanceof.module';

@NgModule({
  imports: [ 
    CommonModule, 
    MediaCardModule,
    InstanceofModule,
    GetImageLinkModule,
  ],
  declarations: [ MediaListComponent ],
  exports: [ MediaListComponent ]
})
export class MediaListModule { }
