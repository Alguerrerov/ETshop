export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export interface CredencialesLogin {
  correo: string;
  contrasena: string;
}
