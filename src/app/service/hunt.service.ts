import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HuntService {

  constructor(private http: HttpClient) { }

  getHuntList(page: number, size: number): Observable<any> {
    const url = `${environment.apiUrl}hunt/list?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  createHunt(hunt: any): Observable<any> {
    const url = `${environment.apiUrl}hunt/create`;
    return this.http.post<any>(url, hunt);
  }
  deleteHunt(id: string): Observable<any> {
    const url = `${environment.apiUrl}hunt/delete/${id}`;
    return this.http.delete<any>(url);
  }
  updateHunt(hunt: any): Observable<any> {
    const url = `${environment.apiUrl}hunt/update`;
    return this.http.put<any>(url, hunt);
  }
}
