import { Comentario, Dispositivo, TipoDispositivo, Vendedor } from '../models/dispositivo';
import { DjProduct, DjReview } from '../models/dummyjson';
import { USD_A_COP } from '../api.config';

/** Categorías de DummyJSON que se muestran en la tienda y su tipo en la app. */
export const CATEGORIAS_DUMMYJSON: Record<string, TipoDispositivo> = {
  smartphones: 'celular',
  laptops: 'portatil',
};

/**
 * DummyJSON no trae vendedor, así que todos los productos los vende la propia tienda.
 * Son datos de demostración.
 */
const VENDEDOR_ETSHOP: Vendedor = {
  nombre: 'ETshop',
  calificacion: 4.8,
  ventasCompletadas: 1200,
  ubicacion: 'Bogotá, Colombia',
  esOficial: true,
};

/** DummyJSON no maneja colores: cada producto tiene una única opción. */
const COLOR_UNICO = 'Estándar';

/** Convierte dólares a pesos, redondeado al millar. */
export function usdACop(precioUsd: number): number {
  return Math.round((precioUsd * USD_A_COP) / 1000) * 1000;
}

/** La reseña destacada es el comentario mejor calificado; si no hay, la descripción. */
function resenaDestacada(p: DjProduct): string {
  const mejor = [...(p.reviews ?? [])].sort((a, b) => b.rating - a.rating)[0];
  return mejor?.comment ? `“${mejor.comment}” — ${mejor.reviewerName}` : p.description;
}

export function aDispositivo(p: DjProduct): Dispositivo {
  return {
    id: p.id,
    nombre: p.title,
    marca: p.brand ?? 'Genérica',
    tipo: CATEGORIAS_DUMMYJSON[p.category] ?? 'celular',
    fechaLanzamiento: p.meta?.createdAt ?? '2025-01-01T00:00:00.000Z',
    precio: usdACop(p.price),
    imagenPrincipal: p.thumbnail,
    galeria: (p.images ?? []).filter(img => img !== p.thumbnail),
    especificaciones: { sku: p.sku, garantia: p.warrantyInformation },
    descripcion: p.description,
    resena: resenaDestacada(p),
    calificacion: p.rating,
    colores: [COLOR_UNICO],
    stock: p.stock,
    vendedor: VENDEDOR_ETSHOP,
  };
}

/** Las reseñas de DummyJSON se presentan como comentarios del producto. */
export function resenaAComentario(productoId: number, r: DjReview, indice: number): Comentario {
  return {
    id: productoId * 100 + indice + 1,
    dispositivoId: productoId,
    usuario: r.reviewerName,
    calificacion: r.rating,
    texto: r.comment,
    fecha: r.date.slice(0, 10),
  };
}

export function aComentarios(productos: DjProduct[]): Comentario[] {
  return productos.flatMap(p => (p.reviews ?? []).map((r, i) => resenaAComentario(p.id, r, i)));
}
