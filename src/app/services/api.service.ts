import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetScoreboard } from './interfaces/get-scoreboard.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getData(): Observable<GetScoreboard[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getPointByUser(userID: string): Observable<any> {
    let params = new HttpParams();
    if (userID !== undefined) {
      params = params.append('userID', userID);
    }
    return this.http.get<any>(`${this.apiUrl}/point-by-user`, { params });
  }
  saveWinner(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-winner`, data);
  }
}
