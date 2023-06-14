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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
