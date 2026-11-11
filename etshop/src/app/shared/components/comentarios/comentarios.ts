import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DispositivoService } from '../../../core/service/dispositivo.service';
import { Comentario } from '../../../core/models/dispositivo';
import { AuthService } from '../../../core/service/auth';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss'
})
export class Comentarios implements OnInit {
  @Input({ required: true }) dispositivoId!: number;

  private dispositivoService = inject(DispositivoService);
  private router = inject(Router);

  usuario$ = inject(AuthService).usuario$;

  comentarios$!: Observable<Comentario[]>;

  textoNuevo = '';
  calificacionNueva = 5;

  ngOnInit(): void {
    this.comentarios$ = this.dispositivoService.obtenerComentariosPorDispositivo(this.dispositivoId);
  }

  /** Para volver a esta pantalla después de iniciar sesión. */
  get urlActual(): string {
    return this.router.url;
  }

  publicarComentario(nombreUsuario: string): void {
    if (!this.textoNuevo.trim()) {
      return;
    }

    this.dispositivoService.agregarComentario({
      dispositivoId: this.dispositivoId,
      usuario: nombreUsuario,
      calificacion: this.calificacionNueva,
      texto: this.textoNuevo
    });

    // Limpiar el formulario después de publicar
    this.textoNuevo = '';
    this.calificacionNueva = 5;
  }
}
