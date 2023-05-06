import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieCategoryComponent } from './movie-category.component';

const routes: Routes = [
  {
    path: '',
    component: MovieCategoryComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MovieCategoryRouting {}
