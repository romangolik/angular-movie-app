import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonCardComponent } from './skeleton-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ SkeletonCardComponent ],
  exports: [ SkeletonCardComponent ],
})
export class SkeletonCardModule { }
