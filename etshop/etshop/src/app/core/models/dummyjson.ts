/** Formas de las respuestas de DummyJSON (solo los campos que usa la app). */

export interface DjReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface DjProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  warrantyInformation?: string;
  reviews?: DjReview[];
  meta?: { createdAt?: string };
  images: string[];
  thumbnail: string;
}

export interface DjListaProductos {
  products: DjProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DjLoginRespuesta {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}
