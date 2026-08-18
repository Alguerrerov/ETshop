import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  correo = '';
  contrasena = '';
  cargando = false;
  mensajeError = '';

  onSubmit(): void {
    if (!this.correo.trim() || !this.contrasena.trim()) {
      this.mensajeError = 'Completa correo y contraseña.';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.authService.login({ correo: this.correo, contrasena: this.contrasena }).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.message;
      }
    });
  }
}
