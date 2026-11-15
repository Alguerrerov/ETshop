import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth';
import { AlmacenamientoService } from './almacenamiento';
import { API_URL } from '../api.config';

const RESPUESTA_LOGIN = {
  id: 1, username: 'emilys', email: 'emily.johnson@x.dummyjson.com',
  firstName: 'Emily', lastName: 'Johnson', accessToken: 'jwt-acceso', refreshToken: 'jwt-refresh',
};

/** JWT mínimo con la fecha de vencimiento indicada (en segundos). */
const jwtConExp = (exp: number) => `x.${btoa(JSON.stringify({ exp }))}.y`;

describe('AuthService', () => {
  let guardado: Record<string, unknown>;
  let http: HttpTestingController;

  const crear = async () => {
    const servicio = TestBed.runInInjectionContext(() => new AuthService());
    await servicio.listo;
    return servicio;
  };

  beforeEach(() => {
    guardado = {};
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AlmacenamientoService,
          useValue: {
            leer: async (k: string) => guardado[k] ?? null,
            guardar: async (k: string, v: unknown) => { guardado[k] = v; },
            borrar: async (k: string) => { delete guardado[k]; },
          },
        },
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  it('inicia sin sesión', async () => {
    const auth = await crear();
    expect(auth.estaAutenticado()).toBe(false);
    expect(auth.token).toBeNull();
  });

  it('inicia sesión en DummyJSON, guarda el JWT y devuelve el usuario', async () => {
    const auth = await crear();
    const promesa = firstValueFrom(auth.login({ usuario: ' emilys ', contrasena: 'emilyspass' }));

    const req = http.expectOne(`${API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.username).toBe('emilys');
    expect(req.request.body.password).toBe('emilyspass');
    req.flush(RESPUESTA_LOGIN);

    const usuario = await promesa;
    expect(usuario).toEqual({ id: 1, nombre: 'Emily', correo: 'emily.johnson@x.dummyjson.com' });
    expect(auth.estaAutenticado()).toBe(true);
    expect(auth.token).toBe('jwt-acceso');
    expect(guardado['etshop_sesion_v2']).toBeTruthy();
  });

  it('rechaza credenciales inválidas con un mensaje claro', async () => {
    const auth = await crear();
    const promesa = firstValueFrom(auth.login({ usuario: 'x', contrasena: 'mal' }));
    http.expectOne(`${API_URL}/auth/login`).flush({ message: 'Invalid credentials' }, { status: 400, statusText: 'Bad Request' });

    await expect(promesa).rejects.toThrow('Usuario o contraseña incorrectos');
    expect(auth.estaAutenticado()).toBe(false);
  });

  it('avisa cuando no hay conexión', async () => {
    const auth = await crear();
    const promesa = firstValueFrom(auth.login({ usuario: 'x', contrasena: 'y' }));
    http.expectOne(`${API_URL}/auth/login`).error(new ProgressEvent('error'));

    await expect(promesa).rejects.toThrow('No se pudo conectar');
  });

  it('cierra sesión y borra lo guardado', async () => {
    const auth = await crear();
    const promesa = firstValueFrom(auth.login({ usuario: 'emilys', contrasena: 'emilyspass' }));
    http.expectOne(`${API_URL}/auth/login`).flush(RESPUESTA_LOGIN);
    await promesa;

    auth.logout();
    expect(auth.estaAutenticado()).toBe(false);
    expect(guardado['etshop_sesion_v2']).toBeUndefined();
  });

  it('restaura la sesión guardada y descarta sesiones sin token', async () => {
    const usuario = { id: 1, nombre: 'Emily', correo: 'e@x.com' };
    guardado['etshop_sesion_v2'] = { usuario, token: 'abc' };
    expect((await crear()).estaAutenticado()).toBe(true);

    guardado['etshop_sesion_v2'] = usuario;
    expect((await crear()).estaAutenticado()).toBe(false);
  });

  it('descarta la sesión guardada si el token ya venció', async () => {
    const usuario = { id: 1, nombre: 'Emily', correo: 'e@x.com' };
    guardado['etshop_sesion_v2'] = { usuario, token: jwtConExp(Math.floor(Date.now() / 1000) - 60) };
    expect((await crear()).estaAutenticado()).toBe(false);
    expect(guardado['etshop_sesion_v2']).toBeUndefined();
  });
});
