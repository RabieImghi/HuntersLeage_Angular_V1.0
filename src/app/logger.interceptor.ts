import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageServiceService } from './service/token-storage-service.service';
import { Router } from '@angular/router';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = new Router();
  const token = localStorage.getItem('auth-token');
  const tokenStorage = new TokenStorageServiceService();
  if (token) {
    if(tokenStorage.isTokenExpired()){
      localStorage.removeItem('auth-token');
      router.navigate(['/login']);
      return next(req);
    }else{
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(authReq);
    }
     
  }else return next(req);
 
  
};
