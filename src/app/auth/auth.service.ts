import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

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

  // logout user();
}
