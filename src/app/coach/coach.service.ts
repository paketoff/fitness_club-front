import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  getAllCoaches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coaches/get-coaches`);
  }
} 
