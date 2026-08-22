import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, tap, of } from 'rxjs';
import { DispositivoService } from '../../core/service/dispositivo.service';
import { Dispositivo } from '../../core/models/dispositivo';
import { Comentarios } from '../../shared/components/comentarios/comentarios';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CarritoService } from '../../core/service/carrito';


@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, Comentarios, ProductCardComponent],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss'
})
export class Detalle {
  private route = inject(ActivatedRoute);
  private dispositivoService = inject(DispositivoService);
  private carritoService = inject(CarritoService);

  imagenActiva = '';
  colorSeleccionado = '';
  cantidad = 1;

  dispositivo$: Observable<Dispositivo | undefined> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      // Reiniciamos selección cada vez que cambia el producto visitado
      this.imagenActiva = '';
      this.colorSeleccionado = '';
      this.cantidad = 1;
      return this.dispositivoService.obtenerPorId(id);
    }),
    tap(dispositivo => {
      if (dispositivo && dispositivo.colores.length > 0) {
        this.colorSeleccionado = dispositivo.colores[0];
      }
    })
  );

 sugerencias$: Observable<Dispositivo[]> = this.dispositivo$.pipe(
  switchMap(dispositivo => {
    if (!dispositivo) {
      return of([]);
    }
    return this.dispositivoService.obtenerSugerencias(dispositivo);
  })
);

  seleccionarImagen(url: string): void {
    this.imagenActiva = url;
  }

  seleccionarColor(color: string): void {
    this.colorSeleccionado = color;
  }

  aumentarCantidad(stock: number): void {
    if (this.cantidad < stock) {
      this.cantidad++;
    }
  }

  disminuirCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  /** */
  mensajeAgregado = false;

agregarAlCarrito(dispositivo: Dispositivo): void {
  this.carritoService.agregarItem(dispositivo, this.colorSeleccionado, this.cantidad);
  this.mensajeAgregado = true;
  setTimeout(() => this.mensajeAgregado = false, 2000);
}


}
