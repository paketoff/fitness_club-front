import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { DescriptionComponent } from './description/description.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthModule } from '../auth/auth.module';
import { LoginComponent } from '../auth/login/login.component';
import { LoginCoachComponent } from '../auth/login-coach/login-coach.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { CoachModule } from '../coach/coach.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { WorkoutsModule } from '../workouts/workouts.module';



@NgModule({
  declarations: [
    MainPageComponent,
    FooterComponent,
    DescriptionComponent,
    ReviewsComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionModule,
    CoachModule,
    WorkoutsModule,
  ]
})
export class HomeModule { }
