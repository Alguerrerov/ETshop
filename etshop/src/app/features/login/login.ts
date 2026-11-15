import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { AuthService } from '../../core/service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario$ = this.authService.usuario$;

  usuario = '';
  contrasena = '';
  cargando = false;
  mensajeError = '';

  onSubmit(): void {
    if (!this.usuario.trim() || !this.contrasena.trim()) {
      this.mensajeError = 'Completa usuario y contraseña.';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.authService.login({ usuario: this.usuario, contrasena: this.contrasena }).subscribe({
      next: () => {
        this.cargando = false;
        void this.router.navigateByUrl(this.destinoTrasLogin());
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.message;
      }
    });
  }

  /** Ruta a la que volver tras iniciar sesión (la pone el guard en ?redirect=). */
  private destinoTrasLogin(): string {
    const destino = this.router.parseUrl(this.router.url).queryParams['redirect'];
    const esRutaInterna = typeof destino === 'string' && destino.startsWith('/') && !destino.startsWith('//');
    return esRutaInterna ? destino : '/tabs/home';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.usuario = '';
    this.contrasena = '';
  }
}
