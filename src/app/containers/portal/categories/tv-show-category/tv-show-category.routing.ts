import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowCategoryComponent } from './tv-show-category.component';

const routes: Routes = [
  {
    path: '',
    component: TvShowCategoryComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TvShowCategoryRouting {}
