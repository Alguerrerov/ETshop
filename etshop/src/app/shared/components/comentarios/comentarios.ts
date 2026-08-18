import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DispositivoService } from '../../../core/service/dispositivo.service';
import { Comentario } from '../../../core/models/dispositivo';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss'
})
export class Comentarios implements OnInit {
  @Input({ required: true }) dispositivoId!: number;

  private dispositivoService = inject(DispositivoService);

  comentarios$!: Observable<Comentario[]>;

  nombreNuevo = '';
  textoNuevo = '';
  calificacionNueva = 5;

  ngOnInit(): void {
    this.comentarios$ = this.dispositivoService.obtenerComentariosPorDispositivo(this.dispositivoId);
  }

  publicarComentario(): void {
    if (!this.nombreNuevo.trim() || !this.textoNuevo.trim()) {
      return;
    }

    this.dispositivoService.agregarComentario({
      dispositivoId: this.dispositivoId,
      usuario: this.nombreNuevo,
      calificacion: this.calificacionNueva,
      texto: this.textoNuevo
    });

    // Limpiar el formulario después de publicar
    this.nombreNuevo = '';
    this.textoNuevo = '';
    this.calificacionNueva = 5;
  }
}
