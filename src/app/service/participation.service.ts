import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient) { }

  createParticipation(participation: any): Observable<any> {
    const url = `${environment.apiUrl}participation/create`;
    return this.http.post<any>(url, participation);
  }
  getTop3Users(): Observable<any> {
    const url = `${environment.apiUrl}participation/getTop3`;
    return this.http.get<any>(url);
  }
  getMyResults(): Observable<any> {
    const url = `${environment.apiUrl}participation/getMyHistoric`;
    return this.http.get<any>(url);
  }
}
