import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {
  texto = '';
  @Output() busqueda = new EventEmitter<string>();

  private cambios$ = new Subject<string>();

  constructor() {
    this.cambios$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(valor => this.busqueda.emit(valor));
  }

  onInput(): void {
    this.cambios$.next(this.texto);
  }
}
