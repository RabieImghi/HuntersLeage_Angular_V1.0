import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
    if(err.status === 401 || err.status === 403) {
      console.log('Unauthorized');
    }
    if(err.status === 404) {
      console.log('Not Found');
    }
      
    const error = err.error.message || err.statusText;
    console.error(error);
    return throwError(()=>err);
  }));
};
