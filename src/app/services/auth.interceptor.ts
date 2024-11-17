import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');
  
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token JWT
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  
      if (tokenPayload.exp < currentTime) { // Verifica si el token ha expirado
        localStorage.removeItem('token'); // Elimina el token expirado
        router.navigate(['/login']); // Redirige al login
        return next(req); // Termina la solicitud sin enviar el token
      }
  
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) { // Maneja errores 401
            localStorage.removeItem('token');
            router.navigate(['/login']);
          }
          return throwError(() => error); // Retorna el error para manejo adicional
        })
      );
    }
  
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
  };
