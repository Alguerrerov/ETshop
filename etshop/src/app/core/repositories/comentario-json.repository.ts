import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { IComentarioRepository } from './comentario-repository.interface';
import { Comentario } from '../models/dispositivo';
import { API_URL } from '../api.config';

@Injectable({ providedIn: 'root' })
export class ComentarioJsonRepository implements IComentarioRepository {
  private http = inject(HttpClient);

  obtenerTodos(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${API_URL}/comentarios.json`).pipe(
      catchError(err => {
        console.error('No se pudieron cargar los comentarios', err);
        return of([] as Comentario[]);
      })
    );
  }
}
