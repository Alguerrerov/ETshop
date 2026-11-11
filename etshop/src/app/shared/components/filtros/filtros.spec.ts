import { TestBed } from '@angular/core/testing';
import { Filtros } from './filtros';
import { proveedoresDePrueba } from '../../../../testing/proveedores';

describe('Filtros', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [Filtros],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(Filtros);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
