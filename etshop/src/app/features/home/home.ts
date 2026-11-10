import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/angular';
import { DispositivoService } from '../../core/service/dispositivo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Filtros } from '../../shared/components/filtros/filtros';
import { FiltrosDispositivo, TipoDispositivo } from '../../core/models/dispositivo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, ProductCardComponent, Filtros,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private dispositivoService = inject(DispositivoService);

  dispositivos$ = this.dispositivoService.dispositivosFiltrados$;
  marcas$ = this.dispositivoService.obtenerMarcasUnicas();

  tipoActivo: TipoDispositivo | 'todos' = 'todos';

  onBuscar(valor: string | null | undefined): void {
    this.dispositivoService.actualizarFiltros({ texto: valor ?? '' });
  }

  onTipo(valor: string | number | null | undefined): void {
    const tipo = (valor ?? 'todos') as TipoDispositivo | 'todos';
    this.tipoActivo = tipo;
    this.dispositivoService.actualizarFiltros({ tipo: tipo === 'todos' ? '' : tipo });
  }

  onCambioFiltros(cambios: Partial<FiltrosDispositivo>): void {
    this.dispositivoService.actualizarFiltros(cambios);
  }
}
