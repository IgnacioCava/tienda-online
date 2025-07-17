# Proyecto Full Stack - Tienda Online

### Descripción

This project is a full-stack advanced online store application with a Next.js frontend and a Node.js + Express backend, connected to MongoDB via Mongoose. It includes authentication, product management, and a dashboard for admins.

Esta proyecto es una aplicación e-commerce full stack, hecha con Next.js en el frontend y Express en el backend. Incluye autenticación, panél de administrador y sistema de almacenamiento de imégenes.

## Esctructura

El proyecto está conformado por un monorepo que contiene todas las aplicaciones, además de una carpeta `packages` donde se guardan los tipados del backend para poder luego ser usandos en el frontend, sin necesidad de duplicar todas nuestas definiciones. Dentro de la carpeta `apps` se pueden encontrar el cliente, servidor y cliente de admin.

├─ apps/  
│ ├─ server/ # Express  
│ ├─ admin-client/ # Next.js  
│ └─ client/ # Next.js  
├─ packages/  
│ └─ shared/ # Tipados y utilidades compartidas  
├─ README.md  
├─ package.json  
└─ ...

## Requisitos

- Node.js (>=16)
- Yarn (>=1.22) o npm
- MongoDB (local o remoto)

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/IgnacioCava/tienda-online.git
cd tienda-online
```

2. Instalar dependencias (desde el root)

```bash
yarn install
# o
npm install
```

3. Agregar archivos `.env` en `apps/client` y `apps/server` (ver `.env.example` respectivos)

## Iniciar proyecto

Se tiene la opción de iniciar cada aplicación por separado, o todas juntas con un solo script.

- ### Iniciar todo junto (desde el root):

```bash
yarn dev
```

Esto iniciará el cliente y servidor desde una misma consola.

- ### Iniciar cada aplicación por separado:

```bash
yarn dev:server
# o
yarn dev:client
```

También se puede iniciar desde el root de cada aplicación, por ejemplo:

```bash
cd apps/server
yarn dev
```

## Ejecutar tests

- Tests del backend

```bash
cd apps/server
yarn test
```

- Tests del frontend

```bash
cd apps/client
yarn test
```
