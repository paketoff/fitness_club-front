import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  
  error!: string;
  
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.loginUser(this.loginForm.value).subscribe(res => {
      this.router.navigate(['/home']);
    },
    err => {
      this.error = err.error.message;
    });
  }
}
