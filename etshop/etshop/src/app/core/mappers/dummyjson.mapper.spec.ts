import { DjProduct } from '../models/dummyjson';
import { aComentarios, aDispositivo, usdACop } from './dummyjson.mapper';

const PRODUCTO: DjProduct = {
  id: 7,
  title: 'iPhone 5s',
  description: 'Un clásico',
  category: 'smartphones',
  price: 199.99,
  rating: 4.4,
  stock: 9,
  brand: 'Apple',
  sku: 'SKU-7',
  warrantyInformation: '1 year warranty',
  thumbnail: 'https://cdn/thumb.webp',
  images: ['https://cdn/thumb.webp', 'https://cdn/2.webp'],
  meta: { createdAt: '2025-04-30T09:41:02.053Z' },
  reviews: [
    { rating: 3, comment: 'Regular', date: '2025-04-30T09:41:02.053Z', reviewerName: 'Ana', reviewerEmail: 'a@x.com' },
    { rating: 5, comment: 'Excelente', date: '2025-05-01T10:00:00.000Z', reviewerName: 'Luis', reviewerEmail: 'l@x.com' },
  ],
};

describe('mapper DummyJSON', () => {
  it('convierte dólares a pesos redondeando al millar', () => {
    expect(usdACop(199.99)).toBe(800000);
    expect(usdACop(1000)).toBe(4000000);
  });

  it('convierte un producto a Dispositivo', () => {
    const d = aDispositivo(PRODUCTO);
    expect(d).toMatchObject({
      id: 7, nombre: 'iPhone 5s', marca: 'Apple', tipo: 'celular', precio: 800000,
      imagenPrincipal: 'https://cdn/thumb.webp', calificacion: 4.4, stock: 9,
      fechaLanzamiento: '2025-04-30T09:41:02.053Z',
    });
    expect(d.galeria).toEqual(['https://cdn/2.webp']);
    expect(d.especificaciones).toEqual({ sku: 'SKU-7', garantia: '1 year warranty' });
    expect(d.colores.length).toBe(1);
    expect(d.resena).toContain('Excelente');
  });

  it('mapea laptops a portátil y usa valores por defecto si faltan datos', () => {
    const d = aDispositivo({ ...PRODUCTO, category: 'laptops', brand: undefined, reviews: undefined, meta: undefined });
    expect(d.tipo).toBe('portatil');
    expect(d.marca).toBe('Genérica');
    expect(d.resena).toBe('Un clásico');
  });

  it('convierte las reseñas en comentarios con id único', () => {
    const comentarios = aComentarios([PRODUCTO]);
    expect(comentarios.length).toBe(2);
    expect(comentarios[0]).toEqual({
      id: 701, dispositivoId: 7, usuario: 'Ana', calificacion: 3, texto: 'Regular', fecha: '2025-04-30',
    });
    expect(new Set(comentarios.map(c => c.id)).size).toBe(2);
  });
});
