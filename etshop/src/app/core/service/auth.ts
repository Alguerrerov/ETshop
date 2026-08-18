import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, throwError } from 'rxjs';
import { Usuario, CredencialesLogin } from '../models/usuario';

// Usuario de prueba, ya que todavía no hay backend real
const USUARIO_DEMO: Usuario = {
  id: 1,
  nombre: 'prueba',
  correo: 'testeo@etshop.com'
};
const CONTRASENA_DEMO = '123456';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  login(credenciales: CredencialesLogin): Observable<Usuario> {
    const esValido =
      credenciales.correo === USUARIO_DEMO.correo &&
      credenciales.contrasena === CONTRASENA_DEMO;

    if (!esValido) {
      return throwError(() => new Error('Correo o contraseña incorrectos')).pipe(delay(500));
    }

    this.usuarioSubject.next(USUARIO_DEMO);
    return of(USUARIO_DEMO).pipe(delay(500));
  }

  logout(): void {
    this.usuarioSubject.next(null);
  }

  estaAutenticado(): boolean {
    return this.usuarioSubject.value !== null;
  }
}
