# Sonido Vivo

Sonido Vivo es un proyecto académico desarrollado con React, Vite y TypeScript. La aplicación simula una tienda de instrumentos musicales y permite ingresar con distintos tipos de usuario según su rol.

Durante el desarrollo se aplicaron contenidos vistos en clases, como componentes reutilizables, formularios con validaciones, navegación entre páginas, manejo de estado, CRUD de productos y pruebas unitarias.

## Cómo ejecutar el proyecto

Primero instala las dependencias:

```bash
npm install
```

Luego inicia la aplicación:

```bash
npm run dev
```

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm run test
```

Para generar el reporte de cobertura:

```bash
npm run test:coverage
```

Para comprobar que el proyecto compile correctamente:

```bash
npm run build
```

Las pruebas se encuentran dentro de `src/Tests`.

## Funcionalidades

- Inicio de sesión con distintos roles.
- Catálogo de productos.
- Búsqueda y filtros por categoría.
- Vista de detalle de cada producto.
- Carrito de compras.
- Consulta de pedidos.
- Gestión de usuarios.
- Control de inventario.
- Creación, modificación y eliminación de productos.
- Diseño adaptable a distintos tamaños de pantalla.
- Pruebas unitarias de las principales funcionalidades.

## Usuarios de prueba

**Administrador**  
Correo: `admin@sonidovivo.cl`  
Contraseña: `admin123`

**Vendedor**  
Correo: `vendedor1@sonidovivo.cl`  
Contraseña: `vendedor123`

**Cliente**  
Correo: `cliente@gmail.com`  
Contraseña: `cliente123`

## Sobre los nombres del código

Los nombres creados por nosotros se dejaron principalmente en español para que el código sea más fácil de leer. Por ejemplo: `Producto`, `Usuario`, `repositorioProductos`, `agregarAlCarrito`, `productosFiltrados`, `TarjetaProducto` y clases CSS como `tarjeta-producto` o `encabezado-pagina`.

Palabras propias de React, TypeScript, HTML, CSS, Bootstrap o Vitest se mantienen en inglés porque forman parte de esas herramientas y cambiarlas haría que el proyecto dejara de funcionar.

Los datos son simulados y se mantienen en memoria mientras la aplicación está abierta.
