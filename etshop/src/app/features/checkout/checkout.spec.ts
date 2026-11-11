import { TestBed } from '@angular/core/testing';
import { Checkout } from './checkout';
import { proveedoresDePrueba } from '../../../testing/proveedores';

describe('Checkout', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(Checkout);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
