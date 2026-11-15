/**
 * API REST externa: DummyJSON (https://dummyjson.com).
 * Se usa para el catálogo de productos, las reseñas y el inicio de sesión (JWT).
 * Con un backend propio bastaría con cambiar esta URL.
 */
export const API_URL = 'https://dummyjson.com';

/**
 * Carpeta con los archivos JSON empaquetados dentro de la app.
 * Solo la usan los repositorios JSON (alternativa sin conexión).
 */
export const DATA_LOCAL_URL = 'data';

/**
 * DummyJSON entrega los precios en dólares; la tienda los muestra en pesos colombianos.
 * Tasa fija de demostración.
 */
export const USD_A_COP = 4000;
