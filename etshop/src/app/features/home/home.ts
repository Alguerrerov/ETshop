import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispositivoService } from '../../core/service/dispositivo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Filtros } from '../../shared/components/filtros/filtros';
import { FiltrosDispositivo } from '../../core/models/dispositivo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, Filtros],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private dispositivoService = inject(DispositivoService);

  dispositivos$ = this.dispositivoService.dispositivosFiltrados$;
  marcas$ = this.dispositivoService.obtenerMarcasUnicas();

  onCambioFiltros(cambios: Partial<FiltrosDispositivo>): void {
    this.dispositivoService.actualizarFiltros(cambios);
  }
}
