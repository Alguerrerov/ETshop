import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { IDispositivoRepository } from '../repositories/dispositivo-repository.interface';
import { DispositivoMockRepository } from '../repositories/dispositivo-mock.repository';
import { Dispositivo, FiltrosDispositivo } from '../models/dispositivo';
import { Comentario } from '../models/dispositivo';
import { COMENTARIOS_MOCK } from '../data/comentarios-mock.data';

@Injectable({ providedIn: 'root' })
export class DispositivoService {

  private repositorio: IDispositivoRepository = inject(DispositivoMockRepository);

  private filtrosSubject = new BehaviorSubject<FiltrosDispositivo>({
  texto: '',
  marca: '',
  tipo: '',
  ordenFecha: 'recientes',
  rangoPrecio: 'todos'
});

  filtros$ = this.filtrosSubject.asObservable();

  private dispositivos$: Observable<Dispositivo[]> = this.repositorio.obtenerTodos();

  dispositivosFiltrados$: Observable<Dispositivo[]> = combineLatest([
    this.dispositivos$,
    this.filtros$
  ]).pipe(
    map(([dispositivos, filtros]) => this.aplicarFiltros(dispositivos, filtros))
  );

  actualizarFiltros(cambios: Partial<FiltrosDispositivo>): void {
    this.filtrosSubject.next({ ...this.filtrosSubject.value, ...cambios });
  }

  obtenerMarcasUnicas(): Observable<string[]> {
    return this.dispositivos$.pipe(
      map(dispositivos => [...new Set(dispositivos.map(d => d.marca))].sort())
    );
  }

  obtenerPorId(id: number): Observable<Dispositivo | undefined> {
    return this.repositorio.obtenerPorId(id);
  }

  private aplicarFiltros(dispositivos: Dispositivo[], filtros: FiltrosDispositivo): Dispositivo[] {
  let resultado = dispositivos.filter(d =>
    (!filtros.texto || d.nombre.toLowerCase().includes(filtros.texto.toLowerCase())) &&
    (!filtros.marca || d.marca === filtros.marca) &&
    (!filtros.tipo || d.tipo === filtros.tipo) &&
    this.cumpleRangoPrecio(d.precio, filtros.rangoPrecio)
  );

  resultado = resultado.sort((a, b) => {
    const fechaA = new Date(a.fechaLanzamiento).getTime();
    const fechaB = new Date(b.fechaLanzamiento).getTime();
    return filtros.ordenFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
  });

  return resultado;
}

private cumpleRangoPrecio(precio: number, rango: FiltrosDispositivo['rangoPrecio']): boolean {
  switch (rango) {
    case 'bajo': return precio < 2000000;
    case 'medio': return precio >= 2000000 && precio <= 6000000;
    case 'alto': return precio > 6000000;
    default: return true; // 'todos'
  }
}

private comentariosSubject = new BehaviorSubject<Comentario[]>(COMENTARIOS_MOCK);
comentarios$ = this.comentariosSubject.asObservable();

obtenerComentariosPorDispositivo(dispositivoId: number): Observable<Comentario[]> {
  return this.comentarios$.pipe(
    map(comentarios => comentarios.filter(c => c.dispositivoId === dispositivoId))
  );
}

agregarComentario(nuevoComentario: Omit<Comentario, 'id' | 'fecha'>): void {
  const comentarios = this.comentariosSubject.value;
  const nuevoId = Math.max(...comentarios.map(c => c.id), 0) + 1;

  const comentario: Comentario = {
    ...nuevoComentario,
    id: nuevoId,
    fecha: new Date().toISOString().split('T')[0]
  };

  this.comentariosSubject.next([comentario, ...comentarios]);
}

obtenerSugerencias(dispositivoActual: Dispositivo): Observable<Dispositivo[]> {
  return this.dispositivos$.pipe(
    map(dispositivos =>
      dispositivos
        .filter(d => d.id !== dispositivoActual.id && d.tipo === dispositivoActual.tipo)
        .slice(0, 4)
    )
  );
}

}


