import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  getAllSubscriptionTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sub-type/get-all-types`);
  }

  //for the personal cabinet
  getUserSubscriptions(user: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/subscriptions/get-users-subscriptions`, user);
  }

  //for admin
  createSubscription(user_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscriptions/create-sub`, user_id);
  }

  updateSubscriptionById(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptions/:id`, id);
  }

  deleteSubscriptionById(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subscriptions/:id`, id);
  }
}
