import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouting } from '@portal/home/home.routing';
import { HomeComponent } from '@portal/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
