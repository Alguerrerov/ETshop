import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth';
import { AlmacenamientoService } from './almacenamiento';

describe('AuthService', () => {
  let guardado: Record<string, unknown>;

  const crear = async () => {
    const servicio = TestBed.runInInjectionContext(() => new AuthService());
    await servicio.listo;
    return servicio;
  };

  beforeEach(() => {
    guardado = {};
    TestBed.configureTestingModule({
      providers: [{
        provide: AlmacenamientoService,
        useValue: {
          leer: async (k: string) => guardado[k] ?? null,
          guardar: async (k: string, v: unknown) => { guardado[k] = v; },
          borrar: async (k: string) => { delete guardado[k]; },
        },
      }],
    });
  });

  it('inicia sin sesión', async () => {
    const auth = await crear();
    expect(auth.estaAutenticado()).toBe(false);
    expect(auth.token).toBeNull();
  });

  it('inicia sesión con credenciales válidas, genera token y lo guarda', async () => {
    const auth = await crear();
    const usuario = await firstValueFrom(auth.login({ correo: 'testeo@etshop.com', contrasena: '123456' }));
    expect(usuario.correo).toBe('testeo@etshop.com');
    expect(auth.estaAutenticado()).toBe(true);
    expect(auth.token).toBeTruthy();
    expect(guardado['etshop_sesion']).toBeTruthy();
  });

  it('rechaza credenciales inválidas', async () => {
    const auth = await crear();
    await expect(firstValueFrom(auth.login({ correo: 'x@x.com', contrasena: 'mal' }))).rejects.toThrow();
    expect(auth.estaAutenticado()).toBe(false);
  });

  it('cierra sesión y borra lo guardado', async () => {
    const auth = await crear();
    await firstValueFrom(auth.login({ correo: 'testeo@etshop.com', contrasena: '123456' }));
    auth.logout();
    expect(auth.estaAutenticado()).toBe(false);
    expect(guardado['etshop_sesion']).toBeUndefined();
  });

  it('restaura la sesión guardada y descarta sesiones sin token', async () => {
    guardado['etshop_sesion'] = { usuario: { id: 1, nombre: 'prueba', correo: 'testeo@etshop.com' }, token: 'abc' };
    expect((await crear()).estaAutenticado()).toBe(true);

    guardado['etshop_sesion'] = { id: 1, nombre: 'prueba', correo: 'testeo@etshop.com' };
    expect((await crear()).estaAutenticado()).toBe(false);
  });
});
