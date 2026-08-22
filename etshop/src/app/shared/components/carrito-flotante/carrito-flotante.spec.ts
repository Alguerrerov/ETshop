import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoFlotante } from './carrito-flotante';

describe('CarritoFlotante', () => {
  let component: CarritoFlotante;
  let fixture: ComponentFixture<CarritoFlotante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoFlotante],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoFlotante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
