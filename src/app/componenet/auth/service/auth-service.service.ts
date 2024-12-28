import { Injectable } from '@angular/core';
import { environment} from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { TokenStorageServiceService} from "../../../service/token-storage-service.service";
import { AuthRequest} from "../interfaces/auth-request";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenStorageServiceService) { }

  login(AuthRequest: AuthRequest): Observable<any>{
    return this.http.post<{ jwt: string }>(this.apiUrl + 'auth/login', AuthRequest).pipe(
      tap((response) => {
        if (response.jwt) {
          this.tokenService.saveToken(response.jwt)
        }
      })
    );
  }
}
