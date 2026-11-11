import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, throwError } from 'rxjs';
import { Usuario, CredencialesLogin, Sesion } from '../models/usuario';
import { AlmacenamientoService } from './almacenamiento';

// Usuario de prueba, ya que todavía no hay backend real
const USUARIO_DEMO: Usuario = {
  id: 1,
  nombre: 'prueba',
  correo: 'testeo@etshop.com'
};
const CONTRASENA_DEMO = '123456';
const CLAVE_SESION = 'etshop_sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
    // Se descartan sesiones guardadas con el formato anterior (sin token)
    if (guardada?.usuario && guardada?.token) {
      this.sesionSubject.next(guardada);
    }
  }

  login(credenciales: CredencialesLogin): Observable<Usuario> {
    const esValido =
      credenciales.correo === USUARIO_DEMO.correo &&
      credenciales.contrasena === CONTRASENA_DEMO;

    if (!esValido) {
      return throwError(() => new Error('Correo o contraseña incorrectos')).pipe(delay(500));
    }

    const sesion: Sesion = { usuario: USUARIO_DEMO, token: this.generarTokenDemo(USUARIO_DEMO) };
    this.sesionSubject.next(sesion);
    void this.almacenamiento.guardar(CLAVE_SESION, sesion);
    return of(USUARIO_DEMO).pipe(delay(500));
  }

  logout(): void {
    this.sesionSubject.next(null);
    void this.almacenamiento.borrar(CLAVE_SESION);
  }

  estaAutenticado(): boolean {
    return this.sesionSubject.value !== null;
  }

  /** Token ficticio con forma de JWT. Con un backend real lo entregaría el servidor. */
  private generarTokenDemo(usuario: Usuario): string {
    const cabecera = btoa(JSON.stringify({ alg: 'none', typ: 'DEMO' }));
    const carga = btoa(JSON.stringify({ sub: usuario.id, correo: usuario.correo, iat: Date.now() }));
    return `${cabecera}.${carga}.demo`;
  }
}
