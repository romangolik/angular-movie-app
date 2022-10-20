import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./containers/portal/portal.module').then(u => u.PortalModule)
  },
  {
    path: '**',
    loadChildren: () => import('./containers/not-found-page/not-found-page.module').then(u => u.NotFoundPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
