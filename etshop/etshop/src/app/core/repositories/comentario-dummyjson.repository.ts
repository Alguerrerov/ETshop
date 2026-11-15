import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IComentarioRepository } from './comentario-repository.interface';
import { Comentario } from '../models/dispositivo';
import { DummyJsonCatalogo } from './dummyjson-catalogo';
import { aComentarios } from '../mappers/dummyjson.mapper';

/** Comentarios base: las reseñas que trae cada producto de DummyJSON. */
@Injectable({ providedIn: 'root' })
export class ComentarioDummyJsonRepository implements IComentarioRepository {
  private catalogo = inject(DummyJsonCatalogo);

  obtenerTodos(): Observable<Comentario[]> {
    return this.catalogo.productos$.pipe(map(aComentarios));
  }
}
