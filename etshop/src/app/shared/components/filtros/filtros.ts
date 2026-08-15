import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltrosDispositivo, TipoDispositivo } from '../../../core/models/dispositivo';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.scss'
})
export class Filtros {
  @Input() marcas: string[] = [];
  @Output() cambioFiltros = new EventEmitter<Partial<FiltrosDispositivo>>();

  marcaSeleccionada = '';
  tipoSeleccionado: TipoDispositivo | '' = '';
  ordenFecha: 'recientes' | 'antiguos' = 'recientes';

  onCambiarMarca(): void {
    this.cambioFiltros.emit({ marca: this.marcaSeleccionada });
  }

  onCambiarTipo(): void {
    this.cambioFiltros.emit({ tipo: this.tipoSeleccionado });
  }

  onCambiarOrden(): void {
    this.cambioFiltros.emit({ ordenFecha: this.ordenFecha });
  }
}
