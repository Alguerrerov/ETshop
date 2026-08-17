export type TipoDispositivo = 'celular' | 'portatil' | 'tablet' | 'smartwatch' | 'auriculares' | 'consola' | 'televisor' | 'cámara' | 'altavoz' | 'otros';

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
}

export interface FiltrosDispositivo {
  texto: string;
  marca: string;
  tipo: TipoDispositivo | '';
  ordenFecha: 'recientes' | 'antiguos';
  rangoPrecio: 'todos' | 'bajo' | 'medio' | 'alto';
}


