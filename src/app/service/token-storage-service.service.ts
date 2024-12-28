import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {
  private readonly TOKEN_KEY = 'auth-token';
  private jwtHelper = new JwtHelperService();


  constructor() { }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clear(){
    localStorage.removeItem(this.TOKEN_KEY);
  }
  

  getRole(): String | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token); 
        console.log('Decoded Token:', decodedToken);
        return decodedToken?.role || null;
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }
    return null;
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true; 
  }
}