import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Detalle } from './features/detalle/detalle';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'detalle/:id', component: Detalle },
];
