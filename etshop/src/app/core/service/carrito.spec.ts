import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CarritoService } from './carrito';
import { AlmacenamientoService } from './almacenamiento';
import { DISPOSITIVO_PRUEBA } from '../../../testing/proveedores';

describe('CarritoService', () => {
  let service: CarritoService;
  let guardado: Record<string, unknown>;

  beforeEach(async () => {
    guardado = {};
    TestBed.configureTestingModule({
      providers: [{
        provide: AlmacenamientoService,
        useValue: {
          leer: async (k: string) => guardado[k] ?? null,
          guardar: async (k: string, v: unknown) => { guardado[k] = v; },
          borrar: async (k: string) => { delete guardado[k]; },
        },
      }],
    });
    service = TestBed.inject(CarritoService);
    await service.listo;
  });

  it('agrega un producto y calcula cantidad y total', async () => {
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Negro', 2);
    expect(await firstValueFrom(service.cantidadTotal$)).toBe(2);
    expect(await firstValueFrom(service.totalPrecio$)).toBe(2000000);
  });

  it('consolida líneas con el mismo producto y color', async () => {
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Negro', 1);
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Negro', 2);
    const items = await firstValueFrom(service.items$);
    expect(items.length).toBe(1);
    expect(items[0].cantidad).toBe(3);
  });

  it('mantiene líneas separadas para colores distintos', async () => {
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Negro', 1);
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Azul', 1);
    expect((await firstValueFrom(service.items$)).length).toBe(2);
  });

  it('cambia cantidad, ignora cantidades menores a 1 y quita ítems', async () => {
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Negro', 2);
    service.cambiarCantidad(1, 'Negro', 4);
    service.cambiarCantidad(1, 'Negro', 0);
    expect((await firstValueFrom(service.items$))[0].cantidad).toBe(4);
    service.quitarItem(1, 'Negro');
    expect((await firstValueFrom(service.items$)).length).toBe(0);
  });

  it('guarda el carrito en el almacenamiento local en cada cambio', () => {
    service.agregarItem(DISPOSITIVO_PRUEBA, 'Negro', 1);
    expect((guardado['etshop_carrito'] as unknown[]).length).toBe(1);
    service.vaciarCarrito();
    expect(guardado['etshop_carrito']).toEqual([]);
  });

  it('restaura el carrito guardado al iniciar', async () => {
    guardado['etshop_carrito'] = [{ dispositivo: DISPOSITIVO_PRUEBA, color: 'Azul', cantidad: 3 }];
    // El constructor usa inject(): se crea dentro de un contexto de inyección
    const restaurado = TestBed.runInInjectionContext(() => new CarritoService());
    await restaurado.listo;
    expect((await firstValueFrom(restaurado.items$))[0].cantidad).toBe(3);
  });
});
