# Mobile Shop

Aplicación web de catálogo de teléfonos móviles desarrollada con Next.js para prueba tecnica.

## Descripción

Mobile Shop es una aplicación web que permite visualizar un catálogo de teléfonos móviles, consultar sus especificaciones y gestionar un carrito de compras.

La aplicación consume una API REST autenticada mediante `x-api-key` y está construida utilizando Next.js con App Router.

## Arquitectura del proyecto

La aplicación está estructurada siguiendo la arquitectura de Next.js App Router.

src/
app/
page.tsx
phone/[id]/
cart/
components/
context/
services/
hooks/
styles/
types/

## Stack Tecnológico

- Next.js 15 (App Router)
- TypeScript
- Node 18.
- SASS
- React Context API
- ESLint

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

## Responsive Design

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla:

- Mobile
- Tablet
- Desktop

## Deployment

La aplicación está desplegada en:

_Próximamente_

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
