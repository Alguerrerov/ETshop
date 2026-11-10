import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ItemCarrito } from '../models/carrito';
import { Dispositivo } from '../models/dispositivo';
import { AlmacenamientoService } from './almacenamiento';

const CLAVE_CARRITO = 'etshop_carrito';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private almacenamiento = inject(AlmacenamientoService);

  private itemsSubject = new BehaviorSubject<ItemCarrito[]>([]);
  items$ = this.itemsSubject.asObservable();

  cantidadTotal$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((total, item) => total + item.cantidad, 0))
  );

  totalPrecio$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((total, item) => total + (item.dispositivo.precio * item.cantidad), 0))
  );

  /** Se resuelve cuando el carrito guardado ya fue cargado. */
  readonly listo: Promise<void>;

  constructor() {
    this.listo = this.cargar();
  }

  private async cargar(): Promise<void> {
    const guardado = await this.almacenamiento.leer<ItemCarrito[]>(CLAVE_CARRITO);
    if (Array.isArray(guardado) && this.itemsSubject.value.length === 0) {
      this.itemsSubject.next(guardado);
    }
  }

  /** Emite la nueva lista y la guarda en el almacenamiento local. */
  private actualizar(items: ItemCarrito[]): void {
    this.itemsSubject.next(items);
    void this.almacenamiento.guardar(CLAVE_CARRITO, items);
  }

  agregarItem(dispositivo: Dispositivo, color: string, cantidad: number): void {
    const items = this.itemsSubject.value;

    // Buscamos si ya existe el mismo dispositivo con el mismo color
    const existente = items.find(
      item => item.dispositivo.id === dispositivo.id && item.color === color
    );

    if (existente) {
      // Si ya existe, solo aumenta la cantidad
      this.actualizar(items.map(item =>
        item === existente
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      // Si no existe, se agrega como item nuevo
      this.actualizar([...items, { dispositivo, color, cantidad }]);
    }
  }

  quitarItem(dispositivoId: number, color: string): void {
    this.actualizar(this.itemsSubject.value.filter(
      item => !(item.dispositivo.id === dispositivoId && item.color === color)
    ));
  }

  cambiarCantidad(dispositivoId: number, color: string, cantidad: number): void {
    if (cantidad < 1) {
      return;
    }
    this.actualizar(this.itemsSubject.value.map(item =>
      item.dispositivo.id === dispositivoId && item.color === color
        ? { ...item, cantidad }
        : item
    ));
  }

  vaciarCarrito(): void {
    this.actualizar([]);
  }
}
