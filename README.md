etshop

Tienda en línea de tecnología (celulares y portátiles). Proyecto académico desarrollado en Angular, con arquitectura por capas orientada a facilitar la futura integración de un back-end.

Estado actual: front-end funcional con datos simulados en memoria (repositorio mock). No existe persistencia real ni servidor.

Stack técnico
Componente	Tecnología
Framework	Angular 22 (standalone components)
Lenguaje	TypeScript
Estilos	SCSS con variables CSS centralizadas
Reactividad	RxJS
Control de versiones	Git / GitHub
Entorno	Ubuntu, Node.js (NVM), VS Code
Arquitectura

El proyecto sigue una arquitectura por capas:

Presentación (components)
        ↓
Servicios de negocio (DispositivoService, AuthService, CarritoService)
        ↓
Repositorio (interfaz + implementación mock)
        ↓
Datos (mock en memoria → API real en el futuro)

Los servicios dependen de la interfaz IDispositivoRepository, no de una implementación concreta. Actualmente se inyecta DispositivoMockRepository; al integrar un back-end, bastará con crear DispositivoHttpRepository e implementar dicha interfaz, sin modificar componentes ni servicios.

Estructura de carpetas
src/app/
├── core/
│   ├── models/          Interfaces de datos
│   ├── data/             Datos mock
│   ├── repositories/      Abstracción del origen de datos
│   └── service/          Lógica de negocio y estado reactivo
├── features/
│   ├── home/               Listado, filtros y búsqueda
│   ├── detalle/              Detalle de producto
│   ├── login/                  Inicio de sesión
│   └── carrito/                  Carrito de compras
└── shared/components/
    ├── header/ · footer/
    ├── product-card/ · filtros/
    ├── comentarios/
    └── carrito-flotante/
Funcionalidades implementadas

Listado principal Grid de productos, buscador con debounce, filtros por marca/precio/fecha, accesos rápidos por categoría.

Detalle de producto Galería de imágenes, descripción, reseña, selección de color y cantidad (limitada por stock), información de envío, información del vendedor, especificaciones técnicas, comentarios de usuarios (listado y formulario), productos sugeridos.

Autenticación Login simulado con credenciales fijas. Estado de sesión reactivo, reflejado globalmente en el header.

Carrito de compras Agregar, editar cantidad y eliminar ítems. Consolidación automática de líneas repetidas (mismo producto y color). Cálculo de subtotales y total. Acceso mediante botón flotante con contador en tiempo real.

Diseño Sistema de variables CSS (color, tipografía, radios, sombras). Tipografías: Space Grotesk, Inter, JetBrains Mono. Diseño responsive.

Credenciales de prueba
Correo:      testeo@etshop.com
Contraseña:  123456
Modelo de datos: front-end vs. diagrama relacional

Existe un diagrama entidad-relación diseñado para el back-end futuro. El front-end actual simplifica varias relaciones al no contar aún con base de datos:

Diagrama (back-end futuro)	Front-end actual
CATEGORIA (tabla)	tipo: string
MARCA (tabla)	marca: string
VENDEDOR (tabla, FK)	Objeto embebido en cada producto
IMAGEN_PRODUCTO (fila por imagen)	galeria: string[]
INVENTARIO (tabla)	stock: number
CARRITO / DETALLE_CARRITO (persistente)	En memoria del navegador
PEDIDO, DETALLE_PEDIDO, PAGO, ENVIO	No implementados
ROL, DIRECCION	No implementados

Esta simplificación es esperada en la etapa actual del proyecto.

Pendientes
Desarrollo del back-end (API REST) conforme al diagrama relacional,
Reemplazo del repositorio mock por una implementación HTTP,
Persistencia del carrito asociada al usuario autenticado,
Flujo de checkout: dirección, método de pago, confirmación de pedido,
Sistema de roles (usuario, vendedor, administrador, soporte),
Registro de nuevos usuarios,
Persistencia de comentarios.
Ejecución del proyecto:
bash
npm install
ng serve -o

Autor

Alguerrerov — Proyecto académico.
