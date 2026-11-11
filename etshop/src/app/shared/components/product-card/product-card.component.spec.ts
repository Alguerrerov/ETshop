import { TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { proveedoresDePrueba, DISPOSITIVO_PRUEBA } from '../../../../testing/proveedores';

describe('ProductCardComponent', () => {
  it('se crea correctamente', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: proveedoresDePrueba(),
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.componentRef.setInput('dispositivo', DISPOSITIVO_PRUEBA);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
