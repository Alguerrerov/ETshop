import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { IDispositivoRepository } from '../repositories/dispositivo-repository.interface';
import { DispositivoMockRepository } from '../repositories/dispositivo-mock.repository';
import { Dispositivo, FiltrosDispositivo } from '../models/dispositivo';

@Injectable({ providedIn: 'root' })
export class DispositivoService {

  private repositorio: IDispositivoRepository = inject(DispositivoMockRepository);

  private filtrosSubject = new BehaviorSubject<FiltrosDispositivo>({
    texto: '',
    marca: '',
    tipo: '',
    ordenFecha: 'recientes'
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
      (!filtros.tipo || d.tipo === filtros.tipo)
    );

    resultado = resultado.sort((a, b) => {
      const fechaA = new Date(a.fechaLanzamiento).getTime();
      const fechaB = new Date(b.fechaLanzamiento).getTime();
      return filtros.ordenFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
    });

    return resultado;
  }
}
