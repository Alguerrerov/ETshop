import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../../core/service/carrito';

@Component({
  selector: 'app-carrito-flotante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito-flotante.html',
  styleUrl: './carrito-flotante.scss'
})
export class CarritoFlotante {
  private carritoService = inject(CarritoService);

  cantidadTotal$ = this.carritoService.cantidadTotal$;
}
