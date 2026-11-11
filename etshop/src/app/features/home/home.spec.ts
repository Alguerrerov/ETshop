import { TestBed } from '@angular/core/testing';
import { Home } from './home';
import { proveedoresDePrueba } from '../../../testing/proveedores';

describe('Home', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
