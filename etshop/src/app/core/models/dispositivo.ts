export type TipoDispositivo = 'celular' | 'portatil';

export interface Especificaciones {
  ram: string;
  almacenamiento: string;
  pantalla: string;
  bateria: string;
  procesador: string;
}

export interface Dispositivo {
  id: number;
  nombre: string;
  marca: string;
  tipo: TipoDispositivo;
  fechaLanzamiento: string;
  precio: number;
  imagenPrincipal: string;
  galeria: string[];
  especificaciones: Especificaciones;
  descripcion: string;
  resena: string;
  calificacion: number;
  colores: string[];
  stock: number;
  vendedor: Vendedor;
}

export interface FiltrosDispositivo {
  texto: string;
  marca: string;
  tipo: TipoDispositivo | '';
  ordenFecha: 'recientes' | 'antiguos';
  rangoPrecio: 'todos' | 'bajo' | 'medio' | 'alto';
}

export interface Comentario {
  id: number;
  dispositivoId: number;
  usuario: string;
  calificacion: number;
  texto: string;
  fecha: string;
}

export interface Vendedor {
  nombre: string;
  calificacion: number;
  ventasCompletadas: number;
  ubicacion: string;
  esOficial: boolean;
}
