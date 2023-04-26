import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaCardModule } from '../media-card/media-card.module';

import { MediaListComponent } from './media-list.component';

@NgModule({
  imports: [ 
    CommonModule, 
    MediaCardModule,
  ],
  declarations: [ MediaListComponent ],
  exports: [ MediaListComponent ]
})
export class MediaListModule { }
