import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDispositivoRepository } from './dispositivo-repository.interface';
import { Dispositivo } from '../models/dispositivo';
import { DummyJsonCatalogo } from './dummyjson-catalogo';
import { aDispositivo } from '../mappers/dummyjson.mapper';

/** Catálogo de celulares y portátiles obtenido de la API REST DummyJSON. */
@Injectable({ providedIn: 'root' })
export class DispositivoDummyJsonRepository implements IDispositivoRepository {
  private catalogo = inject(DummyJsonCatalogo);

  obtenerTodos(): Observable<Dispositivo[]> {
    return this.catalogo.productos$.pipe(map(lista => lista.map(aDispositivo)));
  }

  obtenerPorId(id: number): Observable<Dispositivo | undefined> {
    return this.obtenerTodos().pipe(map(lista => lista.find(d => d.id === id)));
  }
}
