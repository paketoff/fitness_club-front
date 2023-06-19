import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { SubscriptionModule } from '../subscription/subscription.module';
import { CoachModule } from '../coach/coach.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { DescriptionComponent } from './description/description.component';
import { ReviewsComponent } from './reviews/reviews.component';



@NgModule({
  declarations: [
    MainPageComponent,
    FooterComponent,
    DescriptionComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionModule,
    CoachModule,
    WorkoutsModule,
  ]
})
export class HomeModule { }
