import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(u => u.HomeModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(u => u.MoviesModule)
      },
      {
        path: 'tv',
        loadChildren: () => import('./tv-shows/tv-shows.module').then(u => u.TvShowsModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PortalRouting {}
