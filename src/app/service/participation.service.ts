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
}
