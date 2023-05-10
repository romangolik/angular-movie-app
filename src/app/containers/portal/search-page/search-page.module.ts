import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchService } from '@rest/search/search.service';
import { SearchPageFacade } from './search-page.facade';
import { QueryParamsService } from '@core/services/query/query-params.service';

import { MediaCardModule } from '@components/shared/media-card/media-card.module';
import { MediaListModule } from '@components/shared/media-list/media-list.module';
import { InstanceofModule } from '@core/pipes/instanceof/instanceof.module';
import { DirectivesModule } from '@core/directives/directives.module';
import { SearchPageRouting } from './search-page.routing';
import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { SearchPageComponent } from './search-page.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MediaListModule,
    MediaCardModule,
    InstanceofModule,
    DirectivesModule,
    SearchPageRouting,
    GetImageLinkModule,
  ],
  declarations: [ SearchPageComponent ],
  exports: [ SearchPageComponent ],
  providers: [ 
    SearchService,
    SearchPageFacade,
    QueryParamsService
  ]
})
export class SearchPageModule { }
