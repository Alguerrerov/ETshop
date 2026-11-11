import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth';
import { API_URL } from '../api.config';

/**
 * Añade "Authorization: Bearer <token>" a las peticiones hacia la API
 * y cierra la sesión si el servidor responde 401.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(API_URL)) {
    return next(req);
  }

  const auth = inject(AuthService);
  const router = inject(Router);

  // Espera a que se cargue la sesión guardada antes de leer el token
  return from(auth.listo).pipe(
    switchMap(() => {
      const token = auth.token;
      const peticion = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(peticion);
    }),
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        auth.logout();
        void router.navigate(['/tabs/cuenta']);
      }
      return throwError(() => err);
    })
  );
};
