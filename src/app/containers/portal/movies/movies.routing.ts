import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaTypesEnum } from '@rest/media/_types/media-types.enum';
import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./movies-list/movies-list.module').then(u => u.MoviesListModule)
      },
      {
        path: 'category',
        data: {
          mediaType: MediaTypesEnum.MOVIE
        },
        children: [
          {
            path: CategoriesEnum.Trending,
            data: {
              categoryType: CategoriesEnum.Trending
            },
            loadChildren: () => import('../category/category.module').then(u => u.CategoryModule)
          },
          {
            path: CategoriesEnum.Popular,
            data: {
              categoryType: CategoriesEnum.Popular
            },
            loadChildren: () => import('../category/category.module').then(u => u.CategoryModule)
          },
          {
            path: CategoriesEnum.TopRated,
            data: {
              categoryType: CategoriesEnum.TopRated
            },
            loadChildren: () => import('../category/category.module').then(u => u.CategoryModule)
          },
          {
            path: CategoriesEnum.Upcoming,
            data: {
              categoryType: CategoriesEnum.Upcoming
            },
            loadChildren: () => import('../category/category.module').then(u => u.CategoryModule)
          },
          {
            path: CategoriesEnum.NowPlaying,
            data: {
              categoryType: CategoriesEnum.NowPlaying
            },
            loadChildren: () => import('../category/category.module').then(u => u.CategoryModule)
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
export class MovieslRouting {}
