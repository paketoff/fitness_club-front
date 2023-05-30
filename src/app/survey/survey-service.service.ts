import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/survey/questions`);
  }

  processAnswer(answerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/survey/answers`, { answerId });
  }

  getAnswerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/answer/${id}`);
  }
}
