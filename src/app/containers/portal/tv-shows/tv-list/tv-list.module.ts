import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvListComponent } from './tv-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TvListComponent ],
  exports: [ TvListComponent ]
})
export class TvListModule { }
