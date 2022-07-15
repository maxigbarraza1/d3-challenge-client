import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
})
export class PagesModule { }
