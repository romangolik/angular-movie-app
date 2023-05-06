import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaTypesEnum } from '@core/enums/media-types.enum';
import { CategoriesEnum } from '@core/enums/categories.enum';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./tv-list/tv-list.module').then(u => u.TvListModule)
      },
      {
        path: 'category',
        data: {
          mediaType: MediaTypesEnum.TV
        },
        children: [
          {
            path: ':categoryType',
            loadChildren: () => import('../categories/tv-show-category/tv-show-category.module').then(u => u.TvShowCategoryModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TvShowsRouting {}
