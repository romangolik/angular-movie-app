import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRouting } from './portal.routing';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    CommonModule,
    PortalRouting
  ],
  declarations: [ PortalComponent ]
})
export class PortalModule { }
