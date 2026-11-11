import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { DispositivoService } from './dispositivo.service';
import { AlmacenamientoService } from './almacenamiento';
import { proveedoresDePrueba, DISPOSITIVO_PRUEBA } from '../../../testing/proveedores';

describe('DispositivoService', () => {
  let service: DispositivoService;
  let guardado: Record<string, unknown>;

  beforeEach(() => {
    guardado = {};
    TestBed.configureTestingModule({
      providers: [
        ...proveedoresDePrueba(),
        {
          provide: AlmacenamientoService,
          useValue: {
            leer: async (k: string) => guardado[k] ?? null,
            guardar: async (k: string, v: unknown) => { guardado[k] = v; },
            borrar: async (k: string) => { delete guardado[k]; },
          },
        },
      ],
    });
    service = TestBed.inject(DispositivoService);
  });

  it('lista todos los dispositivos, los más recientes primero', async () => {
    const lista = await firstValueFrom(service.dispositivosFiltrados$);
    expect(lista.map(d => d.id)).toEqual([2, 1]);
  });

  it('filtra por tipo', async () => {
    service.actualizarFiltros({ tipo: 'celular' });
    const lista = await firstValueFrom(service.dispositivosFiltrados$);
    expect(lista.length).toBe(1);
    expect(lista[0].tipo).toBe('celular');
  });

  it('filtra por texto sin distinguir mayúsculas', async () => {
    service.actualizarFiltros({ texto: 'PORTÁTIL' });
    const lista = await firstValueFrom(service.dispositivosFiltrados$);
    expect(lista.map(d => d.id)).toEqual([2]);
  });

  it('filtra por rango de precio', async () => {
    service.actualizarFiltros({ rangoPrecio: 'bajo' });
    expect((await firstValueFrom(service.dispositivosFiltrados$)).map(d => d.id)).toEqual([1]);
  });

  it('devuelve marcas únicas ordenadas', async () => {
    expect(await firstValueFrom(service.obtenerMarcasUnicas())).toEqual(['Marca A', 'Marca B']);
  });

  it('obtiene sugerencias del mismo tipo, sin incluir el actual', async () => {
    const sugerencias = await firstValueFrom(service.obtenerSugerencias(DISPOSITIVO_PRUEBA));
    expect(sugerencias.every(d => d.id !== 1 && d.tipo === 'celular')).toBe(true);
  });

  it('agrega comentarios nuevos y los guarda localmente', async () => {
    await new Promise(r => setTimeout(r, 0));
    service.agregarComentario({ dispositivoId: 1, usuario: 'Luis', calificacion: 4, texto: 'Bien' });
    const comentarios = await firstValueFrom(service.obtenerComentariosPorDispositivo(1));
    expect(comentarios[0].usuario).toBe('Luis');
    expect((guardado['etshop_comentarios_propios'] as unknown[]).length).toBe(1);
  });
});
