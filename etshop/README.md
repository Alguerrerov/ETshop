# etshop

Tienda en línea de tecnología (celulares y portátiles). Proyecto académico desarrollado con **Angular + Ionic + Capacitor**: una sola base de código que corre en el navegador y como **app Android**.

> Estado actual: front-end funcional como app híbrida. El catálogo se lee de archivos JSON incluidos en la app y no existe servidor. El carrito, la sesión y los comentarios nuevos se guardan en el almacenamiento local del dispositivo.

## Stack técnico

| Componente | Tecnología |
|---|---|
| Framework | Angular 22 (standalone components) |
| UI móvil | Ionic 9 (`@ionic/angular`) |
| App nativa | Capacitor 8 (Android) |
| Lenguaje | TypeScript |
| Estilos | SCSS con variables CSS centralizadas |
| Reactividad | RxJS |
| Almacenamiento local | Capacitor Preferences |
| Pruebas | Vitest (`ng test`) |
| Control de versiones | Git / GitHub |
| Entorno | Linux, Node.js, VS Code, Android Studio |

## Arquitectura

```
Presentación (features + shared/components, con Ionic)
        ↓
Servicios de negocio (DispositivoService, AuthService, CarritoService)
        ↓
Repositorios (interfaces IDispositivoRepository / IComentarioRepository)
        ↓
Datos: public/data/*.json  →  API real en el futuro
```

- Los servicios dependen de las **interfaces** de repositorio, no de una implementación concreta. La implementación se elige en `src/app/app.config.ts`.
- Hoy se usan `DispositivoJsonRepository` y `ComentarioJsonRepository` (leen JSON con `HttpClient`). Con un backend bastará crear una implementación HTTP y cambiar esa línea; la URL base está en `src/app/core/api.config.ts`.
- `AlmacenamientoService` envuelve Capacitor Preferences (almacenamiento nativo en Android, `localStorage` en el navegador).
- Un **interceptor** añade el token (`Authorization: Bearer ...`) a las peticiones a la API y un **guard** protege las rutas que exigen sesión.

## Estructura de carpetas

```
src/app/
├── core/
│   ├── models/          Interfaces de datos
│   ├── repositories/    Interfaces e implementaciones JSON
│   ├── service/         Lógica de negocio, estado reactivo y almacenamiento
│   ├── guards/          authGuard
│   └── interceptors/    authInterceptor
├── features/
│   ├── tabs/            Barra de pestañas (Inicio, Carrito, Cuenta)
│   ├── home/            Listado, búsqueda y filtros
│   ├── detalle/         Detalle de producto
│   ├── carrito/         Carrito de compras
│   ├── checkout/        Confirmación de pedido (demo, requiere sesión)
│   └── login/           Inicio de sesión / cuenta
└── shared/components/   product-card, filtros, buscador, comentarios
public/data/             dispositivos.json, comentarios.json
android/                 Proyecto nativo generado por Capacitor
```

## Funcionalidades

- **Listado**: grid de productos, búsqueda con debounce, filtros por marca, precio y fecha, y segmentos por categoría.
- **Detalle**: galería, descripción, selección de color y cantidad (limitada por stock), especificaciones, vendedor, comentarios y productos sugeridos.
- **Autenticación**: login simulado con token, sesión persistente, rutas protegidas con guard.
- **Carrito**: agregar, cambiar cantidad y quitar; consolidación de líneas repetidas (mismo producto y color); total; contador en la pestaña. **Se conserva al cerrar la app.**
- **Comentarios**: requieren sesión; los nuevos se guardan en el dispositivo.
- **Checkout de demostración**: resumen del pedido y confirmación (no realiza pagos).

## Credenciales de prueba

```
Correo:      testeo@etshop.com
Contraseña:  123456
```

## Ejecución

### En el navegador

```bash
npm install
npm start          # http://localhost:4200
```

### Como app Android

Requisitos: Node.js, Android Studio y un dispositivo con depuración USB (o un emulador).

```bash
npm install
npm run android        # compila Angular y sincroniza con Capacitor
npx cap open android   # abre el proyecto en Android Studio y pulsa Run
```

Atajos: `npm run android:open` (compila, sincroniza y abre Android Studio) y `npm run android:run` (compila y ejecuta en el dispositivo conectado).
Cada vez que cambies código de Angular hay que volver a ejecutar `npm run android`.

### Pruebas

```bash
npm test
```

## Datos y almacenamiento

- El catálogo y los comentarios iniciales están en `public/data/*.json` (solo lectura).
- Lo que genera el usuario (carrito, sesión, comentarios nuevos) se guarda en el almacenamiento local del dispositivo. No se comparte entre dispositivos y se pierde si se desinstala la app o se borran sus datos. En el navegador, los modos de incógnito o "no guardar historial" lo borran al cerrar.

## Imágenes de los productos

Las imágenes se guardan dentro de la app (`public/img/dispositivos/`) para que se vean sin conexión. Para (re)descargarlas desde las URLs originales del catálogo:

```bash
node descargar-imagenes.mjs
```

El script reescribe `public/data/dispositivos.json` para que apunte a los archivos locales y avisa de las que no pudo descargar. Si una imagen falta o no carga, la app muestra `public/img/placeholder.svg`. Las fotos pertenecen a sus sitios de origen: es un proyecto académico; para publicarlo conviene usar imágenes propias o con licencia.

## Generar un APK

1. `npm run android` (compila y sincroniza).
2. `npx cap open android`.
3. En Android Studio: **Build → Generate App Bundles or APKs → Generate APKs** (o *Build APK(s)*).
4. El archivo queda en `android/app/build/outputs/apk/debug/app-debug.apk`; se puede copiar al celular e instalar (hay que permitir "instalar apps desconocidas") o instalar por USB con `adb install -r app-debug.apk`.

Ese APK es de depuración (sirve para pruebas y demostraciones). Para publicar en Google Play se necesita un APK/AAB **firmado** (*Build → Generate Signed App Bundle or APK*) con un keystore propio.

## Pendientes

- Back-end (API REST) conforme al diagrama relacional (`documentos/ER diagram.png`) y repositorios HTTP.
- Registro de usuarios y sistema de roles (usuario, vendedor, administrador, soporte).
- Checkout real: dirección, método de pago y pedidos.
- Fuentes incluidas en la app para funcionar sin conexión.
- Versión iOS.

## Autor

Alguerrerov — Proyecto académico.
