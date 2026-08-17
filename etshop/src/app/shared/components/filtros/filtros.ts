import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltrosDispositivo } from '../../../core/models/dispositivo';

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
  ordenFecha: 'recientes' | 'antiguos' = 'recientes';
  rangoPrecio: FiltrosDispositivo['rangoPrecio'] = 'todos';

  onCambiarMarca(): void {
    this.cambioFiltros.emit({ marca: this.marcaSeleccionada });
  }

  onCambiarOrden(): void {
    this.cambioFiltros.emit({ ordenFecha: this.ordenFecha });
  }

  onCambiarPrecio(): void {
    this.cambioFiltros.emit({ rangoPrecio: this.rangoPrecio });
  }
}
