import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ItemCarrito } from '../models/carrito';
import { Dispositivo } from '../models/dispositivo';



@Injectable({ providedIn: 'root' })
export class CarritoService {

  private itemsSubject = new BehaviorSubject<ItemCarrito[]>([]);
  items$ = this.itemsSubject.asObservable();

  cantidadTotal$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((total, item) => total + item.cantidad, 0))
  );

  totalPrecio$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((total, item) => total + (item.dispositivo.precio * item.cantidad), 0))
  );

  agregarItem(dispositivo: Dispositivo, color: string, cantidad: number): void {
    const items = this.itemsSubject.value;

    // Buscamos si ya existe el mismo dispositivo con el mismo color
    const existente = items.find(
      item => item.dispositivo.id === dispositivo.id && item.color === color
    );

    if (existente) {
      // Si ya existe, solo aumenta la cantidad
      const actualizados = items.map(item =>
        item === existente
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      this.itemsSubject.next(actualizados);
    } else {
      // Si no existe, su como item nuevo
      this.itemsSubject.next([...items, { dispositivo, color, cantidad }]);
    }
  }

  quitarItem(dispositivoId: number, color: string): void {
    const items = this.itemsSubject.value.filter(
      item => !(item.dispositivo.id === dispositivoId && item.color === color)
    );
    this.itemsSubject.next(items);
  }

  cambiarCantidad(dispositivoId: number, color: string, cantidad: number): void {
    if (cantidad < 1) {
      return;
    }
    const items = this.itemsSubject.value.map(item =>
      item.dispositivo.id === dispositivoId && item.color === color
        ? { ...item, cantidad }
        : item
    );
    this.itemsSubject.next(items);
  }

  vaciarCarrito(): void {
    this.itemsSubject.next([]);
  }
}
