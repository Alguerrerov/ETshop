import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { DispositivoService } from '../../core/service/dispositivo.service';
import { Dispositivo } from '../../core/models/dispositivo';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss'
})
export class Detalle {
  private route = inject(ActivatedRoute);
  private dispositivoService = inject(DispositivoService);

  dispositivo$: Observable<Dispositivo | undefined> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      return this.dispositivoService.obtenerPorId(id);
    })
  );

  imagenActiva = '';

  seleccionarImagen(url: string): void {
    this.imagenActiva = url;
  }
}
