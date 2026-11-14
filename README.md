# ETshop

Tienda en línea de tecnología (celulares y portátiles). Proyecto académico desarrollado como **aplicación híbrida** con Angular, Ionic y Capacitor: el mismo código corre en el navegador y como app Android.

**Estado actual:** front-end funcional con datos locales (archivos JSON empaquetados con la app) y persistencia en el dispositivo. Todavía no existe un servidor ni una base de datos real.

## Stack técnico

| Componente | Tecnología |
|---|---|
| Framework | Angular 22 (standalone components) |
| UI móvil | Ionic 9 (`@ionic/angular`) |
| Híbrido / nativo | Capacitor 8 (Core, CLI, Android) |
| Almacenamiento | `@capacitor/preferences` |
| Lenguaje | TypeScript |
| Estilos | SCSS + variables CSS (`src/theme/variables.css`) |
| Reactividad | RxJS |
| Pruebas | Vitest + jsdom |
| Control de versiones | Git / GitHub |

## APIs que utiliza la aplicación

### Plugins nativos (Capacitor)

- **Preferences**: guarda datos en el dispositivo. En Android usa el almacenamiento nativo (SharedPreferences) y en el navegador usa `localStorage`. Lo encapsula `AlmacenamientoService` (`guardar`, `leer`, `borrar`).

| Clave | Contenido |
|---|---|
| `etshop_sesion` | Usuario y token de la sesión |
| `etshop_carrito` | Ítems del carrito |
| `etshop_comentarios_propios` | Comentarios escritos por el usuario |

El único permiso de Android declarado es `INTERNET`. La app no usa cámara, geolocalización ni notificaciones.

### APIs de red (HttpClient de Angular)

Configurado con `provideHttpClient(withFetch(), withInterceptors([authInterceptor]))`.

| Petición | Descripción |
|---|---|
| `GET data/dispositivos.json` | Catálogo de productos (se pide una sola vez y se reutiliza con `shareReplay`) |
| `GET data/comentarios.json` | Comentarios de ejemplo |

Los JSON están en `public/data/` y viajan dentro de la app. El origen se define en `src/app/core/api.config.ts` (`API_URL = 'data'`); con un backend real sería algo como `https://api.etshop.com`.

**Interceptor (`authInterceptor`):** agrega `Authorization: Bearer <token>` a las peticiones dirigidas a `API_URL` y, si recibe un `401`, cierra la sesión y lleva a la pestaña Cuenta.

**Guard (`authGuard`):** protege `/checkout`. Sin sesión redirige a `/tabs/cuenta?redirect=<ruta>` y vuelve a la ruta original tras iniciar sesión.

## Arquitectura

Arquitectura por capas orientada a facilitar la futura integración de un back-end:

```
Presentación (features + shared/components, UI con Ionic)
        ↓
Servicios de negocio (DispositivoService, AuthService, CarritoService, AlmacenamientoService)
        ↓
Repositorios (interfaces + implementación JSON)
        ↓
Datos (JSON locales hoy → API REST en el futuro)
```

Los servicios dependen de las interfaces `IDispositivoRepository` e `IComentarioRepository`, no de una implementación concreta. Las implementaciones actuales (`DispositivoJsonRepository`, `ComentarioJsonRepository`) se registran en `app.config.ts`. Al tener un back-end bastará con crear implementaciones HTTP, sin modificar componentes ni servicios.

## Estructura del proyecto

```
etshop/
├── android/                  Proyecto nativo Android (generado por Capacitor)
├── public/
│   ├── data/                 dispositivos.json, comentarios.json
│   └── img/                  Imágenes del catálogo y placeholder
├── documentos/               Diagrama ER y enlaces del proyecto
├── descargar-imagenes.mjs    Script para descargar las imágenes del catálogo
├── capacitor.config.ts       appId: com.alguerrerov.etshop
└── src/
    ├── theme/                Variables CSS
    ├── testing/              Proveedores para pruebas
    └── app/
        ├── core/
        │   ├── models/        Interfaces (Dispositivo, ItemCarrito, Usuario, Sesion…)
        │   ├── repositories/  Interfaces e implementaciones JSON
        │   ├── service/       Dispositivo, Auth, Carrito, Almacenamiento
        │   ├── interceptors/  authInterceptor
        │   ├── guards/        authGuard
        │   └── api.config.ts  URL base de datos
        ├── features/
        │   ├── tabs/          Navegación inferior (Inicio · Carrito · Cuenta)
        │   ├── home/          Listado, filtros y búsqueda
        │   ├── detalle/       Detalle de producto
        │   ├── login/         Cuenta / inicio de sesión
        │   ├── carrito/       Carrito de compras
        │   └── checkout/      Finalizar compra
        └── shared/components/ buscador · filtros · product-card · comentarios
```

## Rutas

| Ruta | Pantalla | Protegida |
|---|---|---|
| `/tabs/home` | Inicio (catálogo) | No |
| `/tabs/carrito` | Carrito | No |
| `/tabs/cuenta` | Cuenta / login | No |
| `/detalle/:id` | Detalle del producto | No |
| `/checkout` | Finalizar compra | Sí (`authGuard`) |

## Funcionalidades implementadas

- **Inicio:** grid de productos, buscador con debounce (`ion-searchbar`), filtros por marca, precio y fecha, y accesos rápidos por categoría (celular / portátil).
- **Detalle de producto:** galería de imágenes, descripción, reseña, selección de color y cantidad (limitada por stock), información del vendedor, especificaciones técnicas, comentarios (listado y formulario) y productos sugeridos.
- **Autenticación:** login simulado con token tipo JWT de demostración, sesión persistente entre ejecuciones y estado reactivo reflejado en la interfaz.
- **Carrito:** agregar, editar cantidad y eliminar ítems; consolidación automática de líneas repetidas (mismo producto y color); subtotales y total; contador en la pestaña Carrito; persistencia en el dispositivo.
- **Checkout (demo):** resumen del pedido, confirmación y vaciado del carrito. No se realiza ningún pago.
- **Comentarios propios:** los comentarios nuevos se guardan en el dispositivo.
- **App Android:** empaquetado con Capacitor.
- **Diseño:** variables CSS centralizadas, navegación por pestañas estilo móvil y diseño responsive.

## Credenciales de prueba

```
Correo:      testeo@etshop.com
Contraseña:  123456
```

## Ejecución

### Requisitos

- Node.js y npm
- Para Android: Android Studio y JDK

### En el navegador

```bash
cd etshop
npm install
ng serve -o
```

### En Android

```bash
npm run android        # ng build + cap sync android
npm run android:open   # lo anterior y abre Android Studio
npm run android:run    # lo anterior y ejecuta en un dispositivo o emulador
```

### Pruebas

```bash
npm test
```

### Descargar imágenes del catálogo

```bash
node descargar-imagenes.mjs
```

Guarda las imágenes remotas en `public/img/dispositivos/` y actualiza el JSON para que apunte a ellas. Es seguro repetirlo.

## Modelo de datos: front-end vs. diagrama relacional

Existe un diagrama entidad-relación (`documentos/ER diagram.png`) diseñado para el back-end futuro. El front-end actual simplifica varias relaciones:

| Diagrama (back-end futuro) | Front-end actual |
|---|---|
| CATEGORIA (tabla) | `tipo: 'celular' \| 'portatil'` |
| MARCA (tabla) | `marca: string` |
| VENDEDOR (tabla, FK) | Objeto embebido en cada producto |
| IMAGEN_PRODUCTO (fila por imagen) | `galeria: string[]` |
| INVENTARIO (tabla) | `stock: number` |
| CARRITO / DETALLE_CARRITO | Guardado localmente en el dispositivo |
| PEDIDO, DETALLE_PEDIDO, PAGO, ENVIO | Solo checkout de demostración |
| ROL, DIRECCION | No implementados |

## Pendientes

- Desarrollo del back-end (API REST) conforme al diagrama relacional.
- Reemplazar los repositorios JSON por implementaciones HTTP (cambiar `API_URL` o crear `DispositivoHttpRepository`).
- Autenticación real (el token actual es ficticio) y registro de nuevos usuarios.
- Persistencia del carrito y los comentarios en el servidor, asociados al usuario.
- Checkout completo: dirección, método de pago, pedido y envío.
- Sistema de roles (usuario, vendedor, administrador, soporte).
- Versión iOS.

## Autor

Alguerrerov — Proyecto académico.
