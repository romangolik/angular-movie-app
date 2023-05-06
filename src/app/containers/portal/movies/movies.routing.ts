import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        children: [
          {
            path: ':categoryType',
            loadChildren: () => import('../categories/movie-category/movie-category.module').then(u => u.MovieCategoryModule)
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
