export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export interface CredencialesLogin {
  /** Nombre de usuario (DummyJSON inicia sesión con username, no con correo). */
  usuario: string;
  contrasena: string;
}

export interface Sesion {
  usuario: Usuario;
  /** JWT de acceso entregado por la API. */
  token: string;
  refreshToken?: string;
}
