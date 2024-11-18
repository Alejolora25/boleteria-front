import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // Validar formato del token
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Token mal formado');
      }

      const base64Payload = parts[1]; // Segunda parte del token
      const payload = JSON.parse(atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/')));

      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

      if (payload.exp < currentTime) { // Verifica si el token ha expirado
        console.warn('Token expirado:', token);
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
    } catch (e) {
      if (e instanceof Error) {
        console.error('Error al decodificar el token:', e.message);
      } else {
        console.error('Error desconocido al decodificar el token:', e);
      }
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return next(req);
    }
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
