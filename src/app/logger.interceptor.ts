import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')),
    });
    return next(authReq); 
  }else return next(req);
 
  
};
