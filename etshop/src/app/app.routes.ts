import { Routes } from '@angular/router';
import { TabsPage } from './features/tabs/tabs';
import { Home } from './features/home/home';
import { Detalle } from './features/detalle/detalle';
import { Login } from './features/login/login';
import { CarritoPage } from './features/carrito/carrito';
import { Checkout } from './features/checkout/checkout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', component: Home },
      { path: 'carrito', component: CarritoPage },
      { path: 'cuenta', component: Login },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: 'detalle/:id', component: Detalle },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: '**', redirectTo: 'tabs/home' },
];
