import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) { }

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  getAllUsers(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}/users/get-users`, { headers: this.headers, params: params  });
  }

  getCoachById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coaches/${id}`, { headers: this.headers });
  }

  deleteCoachById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/coaches/${id}`, { headers: this.headers });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`, { headers: this.headers});
  }

  updateUserById(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, { headers: this.headers});
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers: this.headers});
  }

  updateCoachById(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${id}`, updatedData, { headers: this.headers });
  }

  //TODO: сделать пагинацию на бэке
  getAllSubscriptions(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      return this.http.get<any>(`${this.apiUrl}/subscriptions/get-all-subs`, { headers: this.headers, params: params  });
  }

  updateSubscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/subscriptions/${id}`, { headers: this.headers});
  }

  deleteSubscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/subscriptions/${id}`, { headers: this.headers});
  }

}
