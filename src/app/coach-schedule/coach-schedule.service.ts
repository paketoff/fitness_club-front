import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachScheduleService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllSchedules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coach-schedule/get-all-schedules`);
  }

  // bookWorkout()
}
