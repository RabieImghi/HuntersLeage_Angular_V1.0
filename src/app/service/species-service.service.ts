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
  createSpecies(species: any): Observable<any> {
    const url = `${environment.apiUrl}species/create`;
    return this.http.post<any>(url, species);
  }
  updateSpecies(species: any): Observable<any> {
    const url = `${environment.apiUrl}species/update`;
    return this.http.put<any>(url, species);
  }
  deleteSpecies(speciesId: number): Observable<any> {
    const url = `${environment.apiUrl}species/delete/${speciesId}`;
    return this.http.delete<any>(url);
  }
  searchSpecies(name: string, page: number, size: number): Observable<any> {
    const url = `${environment.apiUrl}species/search/${name}?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
}
