import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-coach',
  templateUrl: './login-coach.component.html',
  styleUrls: ['./login-coach.component.scss']
})
export class LoginCoachComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  loginCoachForm = this.fb.group({
    email: [''],
    password: [''],
  });

  error!: string;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.loginCoach(this.loginCoachForm.value).subscribe(res => {
      this.router.navigate(['/home']);
    },
    err => {
      this.error = err.error.message;
    });
  }

}
