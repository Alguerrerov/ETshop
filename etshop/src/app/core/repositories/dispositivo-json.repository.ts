import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { IDispositivoRepository } from './dispositivo-repository.interface';
import { Dispositivo } from '../models/dispositivo';
import { API_URL } from '../api.config';

/**
 * Lee el catálogo desde un archivo JSON empaquetado con la app.
 * Cuando exista un backend, bastará con cambiar API_URL o crear
 * DispositivoHttpRepository con la misma interfaz.
 */
@Injectable({ providedIn: 'root' })
export class DispositivoJsonRepository implements IDispositivoRepository {
  private http = inject(HttpClient);

  // Una sola petición, reutilizada por todos los suscriptores
  private catalogo$: Observable<Dispositivo[]> = this.http
    .get<Dispositivo[]>(`${API_URL}/dispositivos.json`)
    .pipe(
      catchError(err => {
        console.error('No se pudo cargar el catálogo', err);
        return of([] as Dispositivo[]);
      }),
      shareReplay(1)
    );

  obtenerTodos(): Observable<Dispositivo[]> {
    return this.catalogo$;
  }

  obtenerPorId(id: number): Observable<Dispositivo | undefined> {
    return this.catalogo$.pipe(map(lista => lista.find(d => d.id === id)));
  }
}
