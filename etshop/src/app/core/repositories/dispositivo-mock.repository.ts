import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { IDispositivoRepository } from './dispositivo-repository.interface';
import { Dispositivo } from '../models/dispositivo';
import { DISPOSITIVOS_MOCK } from '../data/dispositivos-mock.data';

@Injectable({ providedIn: 'root' })
export class DispositivoMockRepository implements IDispositivoRepository {

  obtenerTodos(): Observable<Dispositivo[]> {
    return of(DISPOSITIVOS_MOCK).pipe(delay(300));
  }

  obtenerPorId(id: number): Observable<Dispositivo | undefined> {
    const encontrado = DISPOSITIVOS_MOCK.find(d => d.id === id);
    return of(encontrado).pipe(delay(300));
  }
}
