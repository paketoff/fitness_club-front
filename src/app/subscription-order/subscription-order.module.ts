import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionOrderComponent } from './subscription-order.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubscriptionOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SubscriptionOrderModule { }
