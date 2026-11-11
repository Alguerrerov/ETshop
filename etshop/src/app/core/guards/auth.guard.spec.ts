import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../service/auth';

describe('authGuard', () => {
  const ejecutar = (autenticado: boolean) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { listo: Promise.resolve(), estaAutenticado: () => autenticado } },
      ],
    });
    const estado = { url: '/checkout' } as RouterStateSnapshot;
    return TestBed.runInInjectionContext(() => authGuard({} as never, estado)) as Promise<boolean | UrlTree>;
  };

  it('deja pasar si hay sesión', async () => {
    expect(await ejecutar(true)).toBe(true);
  });

  it('sin sesión redirige a Cuenta guardando la ruta original', async () => {
    const resultado = await ejecutar(false);
    expect(resultado).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(resultado as UrlTree)).toBe('/tabs/cuenta?redirect=%2Fcheckout');
  });
});
