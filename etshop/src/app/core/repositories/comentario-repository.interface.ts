import { Observable } from 'rxjs';
import { Comentario } from '../models/dispositivo';

export abstract class IComentarioRepository {
  abstract obtenerTodos(): Observable<Comentario[]>;
}
