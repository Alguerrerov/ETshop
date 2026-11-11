import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { IDispositivoRepository } from '../app/core/repositories/dispositivo-repository.interface';
import { IComentarioRepository } from '../app/core/repositories/comentario-repository.interface';
import { Comentario, Dispositivo } from '../app/core/models/dispositivo';

export const DISPOSITIVO_PRUEBA: Dispositivo = {
  id: 1,
  nombre: 'Teléfono de prueba',
  marca: 'Marca A',
  tipo: 'celular',
  fechaLanzamiento: '2025-01-01',
  precio: 1000000,
  imagenPrincipal: 'img.jpg',
  galeria: [],
  especificaciones: { ram: '8 GB', almacenamiento: '128 GB', pantalla: '6"', bateria: '4000 mAh', procesador: 'X' },
  descripcion: 'desc',
  resena: 'reseña',
  calificacion: 4,
  colores: ['Negro', 'Azul'],
  stock: 5,
  vendedor: { nombre: 'Vendedor', calificacion: 5, ventasCompletadas: 10, ubicacion: 'Bogotá', esOficial: true },
};

export const PORTATIL_PRUEBA: Dispositivo = {
  ...DISPOSITIVO_PRUEBA,
  id: 2,
  nombre: 'Portátil de prueba',
  marca: 'Marca B',
  tipo: 'portatil',
  precio: 5000000,
  fechaLanzamiento: '2025-06-01',
};

export const COMENTARIO_PRUEBA: Comentario = {
  id: 1, dispositivoId: 1, usuario: 'Ana', calificacion: 5, texto: 'Muy bueno', fecha: '2025-02-01',
};

/** Repositorios falsos (sin HTTP) + router vacío, para pruebas de componentes y servicios. */
export function proveedoresDePrueba(): (Provider | EnvironmentProviders)[] {
  return [
    provideRouter([]),
    {
      provide: IDispositivoRepository,
      useValue: {
        obtenerTodos: () => of([DISPOSITIVO_PRUEBA, PORTATIL_PRUEBA]),
        obtenerPorId: (id: number) => of([DISPOSITIVO_PRUEBA, PORTATIL_PRUEBA].find(d => d.id === id)),
      },
    },
    { provide: IComentarioRepository, useValue: { obtenerTodos: () => of([COMENTARIO_PRUEBA]) } },
  ];
}
