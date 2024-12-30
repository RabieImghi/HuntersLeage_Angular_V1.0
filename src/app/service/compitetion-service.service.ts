import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateCompetition } from '../front-admin/interface/create-competition';
import { UpdateCompetition } from '../front-admin/interface/update-competition';

@Injectable({
  providedIn: 'root'
})
export class CompitetionServiceService {

  constructor(private http: HttpClient) { }

  createCompetition(competition: CreateCompetition): Observable<any> {
    const url = `${environment.apiUrl}competition/create`;
    return this.http.post<any>(url, competition);
  }

  getCompitetionList(page: number, size: number): Observable<any> {
    const url = `${environment.apiUrl}competition/details?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  deleteCompetition(id: string): Observable<any> {
    const url = `${environment.apiUrl}competition/delete/${id}`;
    return this.http.delete<any>(url);
  }
  updateCompetition(competition: UpdateCompetition): Observable<any> {
    const url = `${environment.apiUrl}competition/create`;
    return this.http.post<any>(url, competition);
  }
}
