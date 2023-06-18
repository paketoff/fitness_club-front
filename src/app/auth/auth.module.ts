import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterCoachComponent } from './register-coach/register-coach.component';
import { LoginCoachComponent } from './login-coach/login-coach.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginCoachComponent,
    RegisterCoachComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
  ]
})
export class AuthModule { }
