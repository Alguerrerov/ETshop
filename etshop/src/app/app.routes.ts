import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Detalle } from './features/detalle/detalle';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'detalle/:id', component: Detalle },
  { path: 'login', component: Login },
];
