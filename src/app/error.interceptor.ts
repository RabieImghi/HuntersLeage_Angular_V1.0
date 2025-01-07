import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (response, next) => {

  const router = inject(Router);
  return next(response).pipe(
    catchError((err) => {
    if(err.status === 401 || err.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Unauthorized : '+ err.message,
      });
      console.log('Unauthorized : ' + err);
    }
    if(err.status === 404) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Not Found : '+ err.message,
      });
      console.log('Not Found : ' + err);
    }
    if(err.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Internal Server Error : '+ err.message,
      });
      console.log('Internal Server Error : ' + err);
    }
    if(err.status === 400) {
      console.log('Bad responseuest : ' + err.message);
    }
    return throwError(()=>err);
  }));
};
