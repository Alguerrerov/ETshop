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
  reseña: string;
  calificacion: number;
}
