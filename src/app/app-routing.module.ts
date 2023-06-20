import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './home/main-page/main-page.component';
import { SurveyComponent } from './survey/survey.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoachScheduleComponent } from './coach-schedule/coach-schedule.component';
import { TrainingBookingComponent } from './training-booking/training-booking.component';
import { SubscriptionOrderComponent } from './subscription-order/subscription-order.component';
import { LoginCoachComponent } from './auth/login-coach/login-coach.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
  {path: 'home', component: MainPageComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-coach', component: LoginCoachComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'coachProfile', component: CoachProfileComponent},
  {path: 'coach-schedule/get-all-schedules', component: CoachScheduleComponent},
  {path: 'training-booking/:id', component: TrainingBookingComponent},
  {path: 'order-subscription', component: SubscriptionOrderComponent},
  {path: 'admin-panel', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
