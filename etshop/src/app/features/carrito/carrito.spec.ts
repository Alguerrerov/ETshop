import { TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito';
import { proveedoresDePrueba } from '../../../testing/proveedores';

describe('CarritoPage', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoPage],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(CarritoPage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
