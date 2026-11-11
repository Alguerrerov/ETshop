import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth';

/** Protege rutas: sin sesión, lleva a Cuenta y vuelve a la ruta original tras iniciar sesión. */
export const authGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.listo;

  return auth.estaAutenticado()
    ? true
    : router.createUrlTree(['/tabs/cuenta'], { queryParams: { redirect: state.url } });
};
