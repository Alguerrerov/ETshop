import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline, cartOutline, personOutline } from 'ionicons/icons';
import { CarritoService } from '../../core/service/carrito';

@Component({
  selector: 'app-tabs',
  imports: [AsyncPipe, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
  templateUrl: './tabs.html',
})
export class TabsPage {
  cantidadTotal$ = inject(CarritoService).cantidadTotal$;

  constructor() {
    addIcons({ homeOutline, cartOutline, personOutline });
  }
}
