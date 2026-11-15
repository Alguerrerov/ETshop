import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { Usuario, CredencialesLogin, Sesion } from '../models/usuario';
import { DjLoginRespuesta } from '../models/dummyjson';
import { API_URL } from '../api.config';
import { AlmacenamientoService } from './almacenamiento';

// Se cambió la clave al pasar a DummyJSON: así se descartan las sesiones demo anteriores
const CLAVE_SESION = 'etshop_sesion_v2';

/** Minutos de vigencia del token que se solicita a la API. */
const MINUTOS_SESION = 60;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private almacenamiento = inject(AlmacenamientoService);

  private sesionSubject = new BehaviorSubject<Sesion | null>(null);
  usuario$: Observable<Usuario | null> = this.sesionSubject.pipe(map(s => s?.usuario ?? null));

  /** Se resuelve cuando la sesión guardada ya fue cargada (la usan el guard y el interceptor). */
  readonly listo: Promise<void>;

  constructor() {
    this.listo = this.restaurarSesion();
  }

  /** Token de la sesión actual, o null si no hay sesión. */
  get token(): string | null {
    return this.sesionSubject.value?.token ?? null;
  }

  private async restaurarSesion(): Promise<void> {
    const guardada = await this.almacenamiento.leer<Sesion>(CLAVE_SESION);
    if (guardada?.usuario && guardada?.token && this.tokenVigente(guardada.token)) {
      this.sesionSubject.next(guardada);
    } else if (guardada) {
      // Sesión incompleta o con el token vencido
      void this.almacenamiento.borrar(CLAVE_SESION);
    }
  }

  /** Inicia sesión contra DummyJSON (POST /auth/login) y guarda el JWT recibido. */
  login(credenciales: CredencialesLogin): Observable<Usuario> {
    return this.http
      .post<DjLoginRespuesta>(`${API_URL}/auth/login`, {
        username: credenciales.usuario.trim(),
        password: credenciales.contrasena,
        expiresInMins: MINUTOS_SESION,
      })
      .pipe(
        map((r): Sesion => ({
          usuario: { id: r.id, nombre: r.firstName || r.username, correo: r.email },
          token: r.accessToken,
          refreshToken: r.refreshToken,
        })),
        tap(sesion => {
          this.sesionSubject.next(sesion);
          void this.almacenamiento.guardar(CLAVE_SESION, sesion);
        }),
        map(sesion => sesion.usuario),
        catchError(err => throwError(() => new Error(this.mensajeDeError(err))))
      );
  }

  logout(): void {
    this.sesionSubject.next(null);
    void this.almacenamiento.borrar(CLAVE_SESION);
  }

  estaAutenticado(): boolean {
    return this.sesionSubject.value !== null;
  }

  private mensajeDeError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 400 || err.status === 401) return 'Usuario o contraseña incorrectos';
      if (err.status === 0) return 'No se pudo conectar con el servidor. Revisa tu conexión.';
    }
    return 'No se pudo iniciar sesión. Inténtalo de nuevo.';
  }

  /** Lee la fecha de vencimiento (exp) del JWT. Si no se puede leer, se considera vigente. */
  private tokenVigente(token: string): boolean {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const { exp } = JSON.parse(atob(base64));
      return typeof exp !== 'number' || exp * 1000 > Date.now();
    } catch {
      return true;
    }
  }
}
