import { TestBed } from '@angular/core/testing';
import { Login } from './login';
import { proveedoresDePrueba } from '../../../testing/proveedores';

describe('Login', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
