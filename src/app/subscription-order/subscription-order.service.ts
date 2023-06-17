import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionOrderService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  createSubscription(subscriptionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscriptions/create-sub/${subscriptionId}`, {},  { headers: this.headers });
  }

  getSubscriptionTypeById(subscriptionTypeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/subscriptions/types/${subscriptionTypeId}`,  { headers: this.headers })
  }

  // updateSubscriptionById(id: number): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/subscriptions/:id`, id, { headers: this.headers });
  // }

  // deleteSubscriptionById(id: any): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/subscriptions/:id`, id, { headers: this.headers });
  // }
}
