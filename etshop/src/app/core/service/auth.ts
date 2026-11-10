import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, throwError } from 'rxjs';
import { Usuario, CredencialesLogin } from '../models/usuario';
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

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  /** Se resuelve cuando la sesión guardada ya fue cargada (útil para guards). */
  readonly listo: Promise<void>;

  constructor() {
    this.listo = this.restaurarSesion();
  }

  private async restaurarSesion(): Promise<void> {
    const guardado = await this.almacenamiento.leer<Usuario>(CLAVE_SESION);
    if (guardado) {
      this.usuarioSubject.next(guardado);
    }
  }

  login(credenciales: CredencialesLogin): Observable<Usuario> {
    const esValido =
      credenciales.correo === USUARIO_DEMO.correo &&
      credenciales.contrasena === CONTRASENA_DEMO;

    if (!esValido) {
      return throwError(() => new Error('Correo o contraseña incorrectos')).pipe(delay(500));
    }

    this.usuarioSubject.next(USUARIO_DEMO);
    void this.almacenamiento.guardar(CLAVE_SESION, USUARIO_DEMO);
    return of(USUARIO_DEMO).pipe(delay(500));
  }

  logout(): void {
    this.usuarioSubject.next(null);
    void this.almacenamiento.borrar(CLAVE_SESION);
  }

  estaAutenticado(): boolean {
    return this.usuarioSubject.value !== null;
  }
}
