import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaCardModule } from '../media-card/media-card.module';
import { InstanceofModule } from '@core/pipes/instanceof/instanceof.module';
import { SkeletonCardModule } from '../skeleton-card/skeleton-card.module';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { MediaListComponent } from './media-list.component';
import { MediaListItemComponent } from './media-list-item/media-list-item.component';

@NgModule({
  imports: [ 
    CommonModule, 
    MediaCardModule,
    InstanceofModule,
    SkeletonCardModule,
    GetImageLinkModule,
  ],
  declarations: [ 
    MediaListComponent, 
    MediaListItemComponent 
  ],
  exports: [ 
    MediaListComponent,
    MediaListItemComponent
  ]
})
export class MediaListModule { }
