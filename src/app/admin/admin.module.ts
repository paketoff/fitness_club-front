import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
