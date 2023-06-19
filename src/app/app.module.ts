import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { CoachComponent } from './coach/coach.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoachScheduleComponent } from './coach-schedule/coach-schedule.component';
import { TrainingBookingComponent } from './training-booking/training-booking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionOrderModule } from './subscription-order/subscription-order.module';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { LoginCoachComponent } from './auth/login-coach/login-coach.component';
import { AuthService } from './auth/auth.service';
import { DescriptionComponent } from './home/description/description.component';
import { FooterComponent } from './home/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    RegisterComponent,
    LoginComponent,
    SubscriptionComponent,
    CoachComponent,
    MainPageComponent,
    WorkoutsComponent,
    UserProfileComponent,
    CoachScheduleComponent,
    TrainingBookingComponent,
    CoachProfileComponent,
    LoginCoachComponent,
    DescriptionComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SubscriptionOrderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
