import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompitetionServiceService {

  constructor(private http: HttpClient) { }

  getCompitetionList(page: number, size: number): Observable<any> {
    const url = `${environment.apiUrl}competition/details?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  deleteCompetition(id: string): Observable<any> {
    const url = `${environment.apiUrl}competition/delete/${id}`;
    return this.http.delete<any>(url);
  }
}
