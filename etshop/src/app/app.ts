import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { CarritoFlotante } from './shared/components/carrito-flotante/carrito-flotante';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CarritoFlotante],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('etshop');
}
