import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TabsPage } from './tabs';
import { proveedoresDePrueba } from '../../../testing/proveedores';

describe('TabsPage', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [TabsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(TabsPage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
