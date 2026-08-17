import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DispositivoService } from '../../../core/service/dispositivo.service';
import { TipoDispositivo } from '../../../core/models/dispositivo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private dispositivoService = inject(DispositivoService);

  texto = '';
  tipoActivo: TipoDispositivo | '' = '';

  private cambios$ = new Subject<string>();

  constructor() {
    this.cambios$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(valor => this.dispositivoService.actualizarFiltros({ texto: valor }));
  }

  onInput(): void {
    this.cambios$.next(this.texto);
  }

  seleccionarTipo(tipo: TipoDispositivo | ''): void {
    this.tipoActivo = tipo;
    this.dispositivoService.actualizarFiltros({ tipo });
  }
}
