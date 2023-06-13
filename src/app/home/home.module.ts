import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { SubscriptionModule } from '../subscription/subscription.module';



@NgModule({
  declarations: [
    MainPageComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionModule,
  ]
})
export class HomeModule { }
