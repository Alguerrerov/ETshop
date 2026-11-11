import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
} from '@ionic/angular';
import { AuthService } from '../../core/service/auth';
import { CarritoService } from '../../core/service/carrito';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  private carritoService = inject(CarritoService);
  private router = inject(Router);

  usuario$ = inject(AuthService).usuario$;
  items$ = this.carritoService.items$;
  totalPrecio$ = this.carritoService.totalPrecio$;

  confirmado = false;

  confirmarPedido(): void {
    this.carritoService.vaciarCarrito();
    this.confirmado = true;
  }

  volverATienda(): void {
    void this.router.navigate(['/tabs/home']);
  }
}
