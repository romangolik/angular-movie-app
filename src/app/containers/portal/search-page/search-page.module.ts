import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchService } from '@rest/search/search.service';

import { SearchPageRouting } from './search-page.routing';

import { SearchPageComponent } from './search-page.component';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';
import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { MediaListModule } from '@components/shared/media-list/media-list.module';
import { InstanceofModule } from '@core/pipes/instanceof/instanceof.module';

@NgModule({
  imports: [
    CommonModule,
    GetImageLinkModule,
    MediaListModule,
    MediaCardModule,
    SearchPageRouting,
    InstanceofModule,
  ],
  declarations: [ SearchPageComponent ],
  exports: [ SearchPageComponent ],
  providers: [ SearchService ]
})
export class SearchPageModule { }
