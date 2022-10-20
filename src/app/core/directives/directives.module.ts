import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebouncedChangeDirective } from './debounced-change.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ DebouncedChangeDirective ],
  exports: [ DebouncedChangeDirective ]
})
export class DirectivesModule { }
