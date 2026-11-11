import { TestBed } from '@angular/core/testing';
import { BuscadorComponent } from './buscador';
import { proveedoresDePrueba } from '../../../../testing/proveedores';

describe('BuscadorComponent', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorComponent],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(BuscadorComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
