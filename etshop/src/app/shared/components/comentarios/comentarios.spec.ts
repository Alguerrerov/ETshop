import { TestBed } from '@angular/core/testing';
import { Comentarios } from './comentarios';
import { proveedoresDePrueba } from '../../../../testing/proveedores';

describe('Comentarios', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [Comentarios],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(Comentarios);
    fixture.componentRef.setInput('dispositivoId', 1);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
