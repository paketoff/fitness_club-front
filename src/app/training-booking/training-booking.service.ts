import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingBookingService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,    
    ) { }

   private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  bookTraining(scheduleId: number, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/workout-history/book/${scheduleId}`, formData, { headers: this.headers });
  }  

  getScheduleById(scheduleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/coach-schedule/${scheduleId}`);
  }
}
