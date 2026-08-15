import { Dispositivo } from '../models/dispositivo';

export const DISPOSITIVOS_MOCK: Dispositivo[] = [
  {
    id: 1,
    nombre: 'Galaxy S25 Ultra',
    marca: 'Samsung',
    tipo: 'celular',
    fechaLanzamiento: '2025-11-01',
    precio: 4500000,
    imagenPrincipal: 'https://picsum.photos/seed/1/400/400',
    galeria: ['https://picsum.photos/seed/1a/400/400', 'https://picsum.photos/seed/1b/400/400'],
    especificaciones: {
      ram: '12GB',
      almacenamiento: '256GB',
      pantalla: '6.8" AMOLED',
      bateria: '5000mAh',
      procesador: 'Snapdragon 8 Gen 4'
    },
    descripcion: 'El Galaxy S25 Ultra es un teléfono inteligente de gama alta con una pantalla AMOLED de 6.8 pulgadas, una cámara de 108MP y un procesador Snapdragon 8 Gen 4.',
    reseña: 'Excelente cámara y rendimiento, ideal para fotografía profesional.',
    calificacion: 4.7
  },
  {
    id: 2,
    nombre: 'iPhone 17 Pro',
    marca: 'Apple',
    tipo: 'celular',
    fechaLanzamiento: '2025-09-20',
    precio: 6200000,
    imagenPrincipal: 'https://picsum.photos/seed/2/400/400',
    galeria: ['https://picsum.photos/seed/2a/400/400'],
    especificaciones: {
      ram: '8GB',
      almacenamiento: '256GB',
      pantalla: '6.3" OLED',
      bateria: '4200mAh',
      procesador: 'A19 Pro'
    },
    descripcion: 'El iPhone 17 Pro es un teléfono inteligente de gama alta con una pantalla OLED de 6.3 pulgadas, una cámara de 12MP y un procesador A19 Pro.',
    reseña: 'Rendimiento insuperable y el mejor ecosistema de apps.',
    calificacion: 4.8
  },
  {
    id: 3,
    nombre: 'ThinkPad X1 Carbon',
    marca: 'Lenovo',
    tipo: 'portatil',
    fechaLanzamiento: '2025-06-15',
    precio: 8900000,
    imagenPrincipal: 'https://picsum.photos/seed/3/400/400',
    galeria: ['https://picsum.photos/seed/3a/400/400'],
    especificaciones: {
      ram: '16GB',
      almacenamiento: '512GB SSD',
      pantalla: '14" 2.8K',
      bateria: '57Wh',
      procesador: 'Intel Core Ultra 7'
    },
    descripcion: 'El ThinkPad X1 Carbon es un portátil empresarial liviano con una pantalla de 14 pulgadas y un procesador Intel Core Ultra 7.',
    reseña: 'Portátil empresarial liviano, teclado excelente para programar.',
    calificacion: 4.6
  },
  {
    id: 4,
    nombre: 'MacBook Air M4',
    marca: 'Apple',
    tipo: 'portatil',
    fechaLanzamiento: '2025-03-10',
    precio: 7500000,
    imagenPrincipal: 'https://picsum.photos/seed/4/400/400',
    galeria: ['https://picsum.photos/seed/4a/400/400'],
    especificaciones: {
      ram: '16GB',
      almacenamiento: '512GB SSD',
      pantalla: '13.6" Liquid Retina',
      bateria: '18h autonomía',
      procesador: 'Apple M4'
    },
    descripcion: 'El MacBook Air M4 es un portátil ultraligero con una pantalla Liquid Retina de 13.6 pulgadas y un procesador Apple M4.',
    reseña: 'Silencioso, liviano y con una batería que dura todo el día.',
    calificacion: 4.9,

  },
  {
    id: 5,
    nombre: 'Redmi Note 14 Pro',
    marca: 'Xiaomi',
    tipo: 'celular',
    fechaLanzamiento: '2025-08-05',
    precio: 1350000,
    imagenPrincipal: 'https://picsum.photos/seed/5/400/400',
    galeria: ['https://picsum.photos/seed/5a/400/400'],
    especificaciones: {
      ram: '8GB',
      almacenamiento: '256GB',
      pantalla: '6.6" AMOLED',
      bateria: '5100mAh',
      procesador: 'Snapdragon 7s'
    },
    descripcion: 'El Redmi Note 14 Pro es un teléfono inteligente de gama media con una pantalla AMOLED de 6.6 pulgadas, una cámara de 108MP y un procesador Snapdragon 7s.',
    reseña: 'Muy buena relación precio-calidad para uso diario.',
    calificacion: 4.3
  },
  {
    id: 6,
    nombre: 'ROG Strix G16',
    marca: 'Asus',
    tipo: 'portatil',
    fechaLanzamiento: '2025-10-12',
    precio: 9800000,
    imagenPrincipal: 'https://picsum.photos/seed/6/400/400',
    galeria: ['https://picsum.photos/seed/6a/400/400'],
    especificaciones: {
      ram: '32GB',
      almacenamiento: '1TB SSD',
      pantalla: '16" 240Hz',
      bateria: '90Wh',
      procesador: 'Intel Core i9'
    },
    descripcion: 'El ROG Strix G16 es un portátil gamer de alto rendimiento con una pantalla de 16 pulgadas a 240Hz y un procesador Intel Core i9.',
    reseña: 'Portátil gamer potente, ideal para juegos exigentes.',
    calificacion: 4.5
  }
];
