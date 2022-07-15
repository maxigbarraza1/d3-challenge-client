import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCarDialogComponent } from './new-car-dialog/new-car-dialog.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarTableComponent } from './car-table/car-table.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmptyCardComponent } from './empty-card/empty-card.component';



@NgModule({
  declarations: [
    NewCarDialogComponent,
    CarTableComponent,
    NavBarComponent,
    EmptyCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    NavBarComponent,
    CarTableComponent,
    EmptyCardComponent,
  ]
})
export class ComponentsModule { }
