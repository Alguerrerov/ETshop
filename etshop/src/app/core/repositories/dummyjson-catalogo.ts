import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, retry, shareReplay } from 'rxjs';
import { API_URL } from '../api.config';
import { DjListaProductos, DjProduct } from '../models/dummyjson';
import { CATEGORIAS_DUMMYJSON } from '../mappers/dummyjson.mapper';

/**
 * Descarga los productos de DummyJSON una sola vez y los comparte.
 * Lo usan el repositorio de dispositivos y el de comentarios (las reseñas vienen dentro del producto).
 */
@Injectable({ providedIn: 'root' })
export class DummyJsonCatalogo {
  private http = inject(HttpClient);

  readonly productos$: Observable<DjProduct[]> = forkJoin(
    Object.keys(CATEGORIAS_DUMMYJSON).map(categoria =>
      // limit=0 pide todos los productos de la categoría
      this.http.get<DjListaProductos>(`${API_URL}/products/category/${categoria}?limit=0`)
    )
  ).pipe(
    map(listas => listas.flatMap(l => l.products)),
    retry({ count: 1, delay: 500 }),
    catchError(err => {
      console.error('No se pudo cargar el catálogo de DummyJSON', err);
      return of([] as DjProduct[]);
    }),
    shareReplay(1)
  );
}
