import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    // Si una imagen no carga (archivo faltante o sin conexión), se muestra una imagen de reemplazo
    document.addEventListener('error', (evento) => {
      const elemento = evento.target;
      if (elemento instanceof HTMLImageElement && !elemento.dataset['respaldo']) {
        elemento.dataset['respaldo'] = '1';
        elemento.src = 'img/placeholder.svg';
      }
    }, true);
  }
}
