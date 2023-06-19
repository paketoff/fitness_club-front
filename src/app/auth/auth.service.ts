import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private jwtHelper = new JwtHelperService();

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, user).pipe(
      tap((res: any) => {
        if (res && res.access_token) {
          localStorage.setItem('access_token', res.access_token);
        }
      })
    );
  }

  registerCoach(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register-coach`, user);
  }

  loginCoach(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login-coach`, user).pipe(
      tap((res: any) => {
        if (res && res.access_token) {
          localStorage.setItem('access_token', res.access_token);
        }
      })
    );
  }

  logoutUser(): void {
    localStorage.removeItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  decodeToken(token: any): any {
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
