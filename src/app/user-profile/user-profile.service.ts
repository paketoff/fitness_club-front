import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));


   // Get the current user's data
   getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/profile`, { headers: this.headers });
  }

  //for the user
  updateCurrentUser(updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/profile`, updatedData, { headers: this.headers });
  }
  
  //for the admin
  updateUserById(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`/profile/${id}`, updatedData);
  }
}
