import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieslRouting } from './movies.routing';

@NgModule({
  imports: [
    CommonModule,
    MovieslRouting
  ],
})
export class MoviesModule { }
