import { TestBed } from '@angular/core/testing';
import { Detalle } from './detalle';
import { proveedoresDePrueba } from '../../../testing/proveedores';

describe('Detalle', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [Detalle],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(Detalle);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
