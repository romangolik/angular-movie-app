import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRouting } from './portal.routing';

import { PortalComponent } from './portal.component';
import { SidebarComponent } from '@components/layout/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    PortalRouting,
  ],
  declarations: [
    PortalComponent,
    SidebarComponent
  ]
})
export class PortalModule { }
