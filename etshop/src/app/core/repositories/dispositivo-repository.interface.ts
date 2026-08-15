import { Observable } from 'rxjs';
import { Dispositivo } from '../models/dispositivo';

export abstract class IDispositivoRepository {
  abstract obtenerTodos(): Observable<Dispositivo[]>;
  abstract obtenerPorId(id: number): Observable<Dispositivo | undefined>;
}
