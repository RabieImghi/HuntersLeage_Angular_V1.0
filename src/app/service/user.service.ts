import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SerachUser } from '../front-admin/interface/serach-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(userSearch: SerachUser, page: number, size: number): Observable<any> {
    const url = `${environment.apiUrl}user/getAll?page=${page}&size=${size}`;
    return this.http.post<any>(url, userSearch);
  }

  public createUser(user: any): Observable<any> {
    const url = `${environment.apiUrl}user/create`;
    return this.http.post<any>(url, user);
  }
  public updateUser(user: any): Observable<any> {
    const url = `${environment.apiUrl}user/update`;
    return this.http.put<any>(url, user);
  }
  deleteUser(id: string): Observable<any> {
    const url = `${environment.apiUrl}user/delete/${id}`;
    return this.http.delete<any>(url);
  }
}
