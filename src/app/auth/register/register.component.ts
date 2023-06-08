import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  registerForm = this.fb.group({
    name: [''],
    surname: [''],
    email: [''],
    phone: [''],
    password: [''],
  });

  error!: string;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.registerUser(this.registerForm.value).subscribe(res => {
      this.router.navigate(['/login']);
    },
    err => {
      this.error = err.error.message;
    });
  }

}
