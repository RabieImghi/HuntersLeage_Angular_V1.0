import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeciesServiceService {

  constructor(private http: HttpClient) { }

  getSpeciesList(page: number, size: number): Observable<any> {
    const url = `${environment.apiUrl}species/list?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
}
