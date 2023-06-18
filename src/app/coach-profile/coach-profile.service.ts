import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachProfileService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  getCurrentCoach(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coaches/profile`, {
      headers: this.headers
    });
  }

  //for the coach
  updateCurrentCoach(updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/coaches/profile`, updatedData, {
      headers: this.headers
    });
  }

  getScheduleForCoach(page: number = 1, limit: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}/coach-schedule/check-coach-schedule`, { headers: this.headers, params: params  });
  }

  //for the coach
  createCoachSchedule(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/coach-schedule/create-coach-schedule`, user, { headers: this.headers });
  }

  updateSchedule(id: number, scheduleUpd: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/coach-schedule/${id}`, scheduleUpd, { headers: this.headers });
  }

}
