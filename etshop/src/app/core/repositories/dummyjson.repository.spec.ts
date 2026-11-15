import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { DispositivoDummyJsonRepository } from './dispositivo-dummyjson.repository';
import { ComentarioDummyJsonRepository } from './comentario-dummyjson.repository';
import { DjProduct } from '../models/dummyjson';
import { API_URL } from '../api.config';

const producto = (id: number, category: string): DjProduct => ({
  id, title: `Producto ${id}`, description: 'd', category, price: 100, rating: 4, stock: 3,
  thumbnail: 't.webp', images: [],
  reviews: [{ rating: 5, comment: 'Bien', date: '2025-01-02T00:00:00Z', reviewerName: 'Ana', reviewerEmail: 'a@x.com' }],
});

const lista = (products: DjProduct[]) => ({ products, total: products.length, skip: 0, limit: 0 });

describe('Repositorios DummyJSON', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });

  const responderCatalogo = () => {
    http.expectOne(`${API_URL}/products/category/smartphones?limit=0`).flush(lista([producto(1, 'smartphones')]));
    http.expectOne(`${API_URL}/products/category/laptops?limit=0`).flush(lista([producto(2, 'laptops')]));
  };

  it('arma el catálogo con smartphones y laptops', async () => {
    const promesa = firstValueFrom(TestBed.inject(DispositivoDummyJsonRepository).obtenerTodos());
    responderCatalogo();
    const todos = await promesa;
    expect(todos.map(d => [d.id, d.tipo])).toEqual([[1, 'celular'], [2, 'portatil']]);
  });

  it('busca un producto por id', async () => {
    const promesa = firstValueFrom(TestBed.inject(DispositivoDummyJsonRepository).obtenerPorId(2));
    responderCatalogo();
    expect((await promesa)?.nombre).toBe('Producto 2');
  });

  it('descarga el catálogo una sola vez aunque lo usen los dos repositorios', async () => {
    const dispositivos = TestBed.inject(DispositivoDummyJsonRepository);
    const comentarios = TestBed.inject(ComentarioDummyJsonRepository);
    const a = firstValueFrom(dispositivos.obtenerTodos());
    const b = firstValueFrom(comentarios.obtenerTodos());
    responderCatalogo();
    await Promise.all([a, b]);
    expect((await b).length).toBe(2);
    http.verify();
  });

  it('devuelve una lista vacía si la API falla', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const promesa = firstValueFrom(TestBed.inject(DispositivoDummyJsonRepository).obtenerTodos());
    // Un intento y un reintento. Al fallar una petición, forkJoin cancela la otra.
    for (let i = 0; i < 2; i++) {
      await new Promise(r => setTimeout(r, i * 600));
      const [primera] = http.match(() => true).filter(r => !r.cancelled);
      primera.flush('error', { status: 500, statusText: 'Error' });
    }
    expect(await promesa).toEqual([]);
  });
});
