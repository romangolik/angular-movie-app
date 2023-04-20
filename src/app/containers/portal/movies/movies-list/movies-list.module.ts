import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesListlRouting } from './movies-list.routing';

import { MoviesListComponent } from './movies-list.component';

@NgModule({
  imports: [
    CommonModule,
    MoviesListlRouting
  ],
  declarations: [ MoviesListComponent ],
  exports: [ MoviesListComponent ]
})
export class MoviesListModule { }
