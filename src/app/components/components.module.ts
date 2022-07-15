import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCarDialogComponent } from './new-car-dialog/new-car-dialog.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarTableComponent } from './car-table/car-table.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    NewCarDialogComponent,
    CarTableComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    NavBarComponent,
    CarTableComponent
  ]
})
export class ComponentsModule { }
