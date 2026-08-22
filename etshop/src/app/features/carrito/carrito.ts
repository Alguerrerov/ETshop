import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../core/service/carrito';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class CarritoPage {
  private carritoService = inject(CarritoService);

  items$ = this.carritoService.items$;
  totalPrecio$ = this.carritoService.totalPrecio$;

  aumentar(dispositivoId: number, color: string, cantidadActual: number, stock: number): void {
    if (cantidadActual < stock) {
      this.carritoService.cambiarCantidad(dispositivoId, color, cantidadActual + 1);
    }
  }

  disminuir(dispositivoId: number, color: string, cantidadActual: number): void {
    if (cantidadActual > 1) {
      this.carritoService.cambiarCantidad(dispositivoId, color, cantidadActual - 1);
    }
  }

  quitar(dispositivoId: number, color: string): void {
    this.carritoService.quitarItem(dispositivoId, color);
  }
}
