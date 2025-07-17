Prueba Tcnica Avanzada Tienda Online CRUD + Autenticacin + Dashboard

Objetivo:
Construir una aplicacin full-stack avanzada para una tienda online que permita realizar operaciones
CRUD sobre productos, gestionar usuarios con autenticacin y mostrar mtricas bsicas en un
dashboard. El proyecto debe mostrar buenas prcticas de arquitectura, diseo de componentes
reutilizables y manejo de estado.

Stack Tecnolgico Requerido:

- Frontend: Next.js (App Router), Tailwind CSS, Zustand o Context API.
- Backend: Node.js con Express.
- Base de datos: MongoDB (con Mongoose) o Firebase.
- Autenticacin: Firebase Auth, Auth0 o JWT.
- Almacenamiento de imgenes: Firebase Storage o Cloudinary.
- Testing bsico (opcional): Jest o Vitest.

Funcionalidades esperadas:

1. Gestin de productos (CRUD completo)

- Campos: name, description, price, image, stock, category.
- Validaciones en frontend y backend.
- Filtros y bsqueda.
- Paginacin en la vista.

2. Autenticacin y autorizacin

- Registro y login de usuarios.
- CRUD disponible solo para usuarios logueados.

- Roles: admin y cliente.

3. Dashboard para administradores

- Total de productos.
- Productos con bajo stock.
- Ventas simuladas (mock data).
- Grfica simple con Chart.js o Recharts.

4. Responsividad y experiencia de usuario

- Diseo mobile-first.
- Animaciones mnimas.
- Feedback visual para errores y cargas.

Bonus (suma puntos):

- Uso de TypeScript (ideal frontend).
- Deployment en Vercel y Render/Fly.io.
- Testing unitario en componentes y endpoints.
- Git con ramas y commits claros.
- Documentacin del cdigo o diagramas.

Estructura sugerida del proyecto:
/frontend (Next.js + Tailwind)
/backend (Node.js + Express)
/README.md (instrucciones)
/db (scripts de setup, esquemas, etc.)

Entrega:

- Enlace al repositorio GitHub o GitLab.
- README.md detallado:
- Instrucciones de instalacin.
- Herramientas utilizadas.
- Consideraciones tcnicas.
- Capturas o video (opcional).

Sugerencia final:
Se evaluar el enfoque, estructura, buenas prcticas, claridad y capacidad de resolver una solucin
realista.
