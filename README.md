# Mobile Shop

Aplicación web de catálogo de telefonos móviles desarrollada con Next.js 15. El proyecto implementa la visualización, búsqueda y gestión de un carrito de compras, siguiendo los requerimientos técnicos y de diseño propuestos.

## Deployment

La aplicación está desplegada en:

[ mobile-shop-nine-silk.vercel.app](https://mobile-shop-nine-silk.vercel.app)

## Funcionalidades Clave

Se han implementado los siguients requerimientos obligatorios y opcionales:

- **Listado Dinámico:** Cuadrícula de productos con los primeros 20 resultados de la API.
- **Filtrado por API en tiempo real:** Buscador integrado directamente con la API del backend mediante parámetros de URL.
- **Detalle de Producto Dinámico:** Actualización de precios e imágenes en tiempo real según la selección de color y almacenamiento.
- **Carrito Persistente:** Gestión completa del carrito con sincronización en `localStorage` y prevención de errores de hidratación.
- **Sección Opcional (SSR):** Implementado con Next.js 15 aprovechando el renderizado del lado del servidor para una carga inicial ultra rápida.
- **Manejo de Errores:** Implementación de Error Boundaries (`error.tsx`) para una interfaz robusta ante fallos de red.
- **Despliegue:** Aplicación disponible en Vercel.

## Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Entorno:** Node 18+
- **Estilos:** CSS3 / SASS (Diseño Responsive Mobile First)
- **Gestión de Estado:** React Context API
- **Calidad de Código:** ESLint, Prettier y Jest / React Testing Library.

## Arquitectura del Proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad:

```text
src/
├── app/            # Rutas, layouts y segmentos de error (App Router)
├── components/     # Componentes de UI reutilizables
├── config/         # Variables de entorno y constantes globales
├── context/        # Estado global (CartContext)
├── services/       # Capa de integración con la API REST
├── types/          # Definiciones e interfaces de TypeScript
├── utils/          # Funciones de ayuda y lógica de sanitización
```

## Responsive Design

Se ha seguido una estrategia Mobile-First, utilizando Flexbox y CSS Grid para asegurar que los layouts de la cuadrícula de productos y la vista de detalle se reorganicen de forma óptima según el viewport.

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla:

- Mobile
- Tablet
- Desktop
- Hemos añadido más medidas allí donde lo hemos creído necesario para que el responsive se viese fluido.

## Decisiones técnicas

- **Optimización de Hidratación**: Se ha utilizado carga dinámica para el contador del carrito, evitando errores de desajuste entre el servidor y el cliente al acceder al localStorage.
- **Sanitización de Datos**: La capa de servicios incluye filtros para evitar IDs duplicados provenientes de la API, garantizando la estabilidad del renderizado en React.

## Gestión de estado

El estado global de la aplicación se gestiona mediante React Context API.

El carrito de compra se almacena en:

- React Context para el estado global
- localStorage para persistencia entre sesiones

## Integración con API

Todas las peticiones a la API requieren autenticación mediante el header:

x-api-key: <API_KEY>

Las llamadas se centralizan en la carpeta `services`.

## Testing

Se han implementado pruebas utilizando:

- Jest
- React Testing Library

```
Métrica    |    Porcentaje
Lines               98.13%
Statements          96.08%
Branches            90.52%
Functions           94.00%
```

Nota: La consola del navegador está 100% libre de errores y advertencias.

Para ejecutar los tests con el reporte de cobertura:

Bash
npm test -- --coverage

## Instalación

```bash
npm install
```

## Modos de ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```
