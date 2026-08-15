import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispositivoService } from '../../core/service/dispositivo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { BuscadorComponent } from '../../shared/components/buscador/buscador';
import { Filtros } from '../../shared/components/filtros/filtros';
import { FiltrosDispositivo } from '../../core/models/dispositivo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, BuscadorComponent, Filtros],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private dispositivoService = inject(DispositivoService);

  dispositivos$ = this.dispositivoService.dispositivosFiltrados$;
  marcas$ = this.dispositivoService.obtenerMarcasUnicas();

  onBusqueda(texto: string): void {
    this.dispositivoService.actualizarFiltros({ texto });
  }

  onCambioFiltros(cambios: Partial<FiltrosDispositivo>): void {
    this.dispositivoService.actualizarFiltros(cambios);
  }
}
