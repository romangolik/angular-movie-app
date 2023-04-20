import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GetImageLinkModule } from '@core/pipes/get-image-link/get-image-link.module';

import { HeroComponent } from './hero.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GetImageLinkModule
  ],
  declarations: [ HeroComponent ],
  exports: [ HeroComponent ]
})
export class HeroModule { }
