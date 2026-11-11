# Retrospectiva Sprint 6 – Manglü

> Retrospectiva del **sexto sprint** (base de datos con MySQL y Sequelize), realizada al comenzar el Sprint 7.

## Retrospectiva Starfish ⭐

### ➕ Comenzar a hacer

- Validar todos los formularios en el back-end con **Express Validator**, en lugar de repetir `if` y expresiones regulares dentro de cada controlador.
- Probar el sitio **desde cero en una base de datos limpia** (migraciones + seeders) antes de dar por terminado un sprint.
- Revisar que las rutas guardadas en la base de datos (por ejemplo, las imágenes de perfil) apunten a archivos que realmente existen.
- Escribir una lista de pruebas manuales (datos vacíos, repetidos, demasiado cortos, archivos inválidos) y recorrerla en cada formulario.
- Actualizar el tablero de trabajo y el README a medida que avanza el sprint, no al final.

### 🔄 Hacer más

- Usar migraciones y seeders para que cualquier integrante pueda reconstruir la base de datos con dos comandos.
- Mantener la separación entre rutas, controladores, modelos y vistas, ahora también con modelos de Sequelize.
- Probar el flujo completo (registro → login → carrito → producto) después de cada cambio importante.
- Comentar el código y el README para que el siguiente sprint se pueda retomar fácilmente.

### ⭐ Continuar haciendo

- Trabajar con una funcionalidad a la vez y comprobarla antes de pasar a la siguiente.
- Cifrar las contraseñas con bcryptjs y guardar las credenciales de la base en variables de entorno (`.env`, fuera del repositorio).
- Mantener una base de datos de pruebas (`manglu_test`) separada de la principal.
- Documentar el modelo con el diagrama entidad-relación.

### 🔽 Hacer menos

- Validaciones escritas a mano y duplicadas en varios controladores.
- Cambios grandes de una sola vez; es mejor avanzar en pasos pequeños que se puedan probar.
- Dejar detalles de documentación (enlaces del tablero, rutas de carpetas en el README) para el último momento.

### 🛑 Dejar de hacer

- Confiar en que los datos que llegan del formulario son correctos.
- Guardar en la base datos que dependen de archivos que no existen en el proyecto.
- Aceptar imágenes solo por la extensión del nombre del archivo, sin comprobar qué contienen.
- Mantener datos “de prueba” en archivos JSON cuando la fuente de verdad ya es la base de datos.

## Dificultades y aprendizajes

- **De JSON a base de datos:** migrar productos y usuarios a MySQL obligó a pensar en tablas, claves foráneas y relaciones (categorías, tamaños, carritos). El diagrama entidad-relación ayudó a ponerse de acuerdo.
- **Migraciones y seeders:** reproducir la base de datos desde cero evitó depender de lo que cada integrante tenía en su computador, aunque exige ejecutar los comandos en el orden correcto.
- **Revisión al empezar el Sprint 7:** al revisar el proyecto se encontraron detalles que el Sprint 6 había dejado sueltos: la foto de perfil por defecto apuntaba a una carpeta distinta de la real, el formulario de administración sustituía al usuario logueado en el encabezado, y las reglas de validación estaban repetidas y eran más flexibles de lo que pide el sprint (nombre de producto de 3 caracteres, descripción de 10, imágenes escritas como texto).

## Conclusión

El Sprint 6 dejó a Manglü con una base de datos relacional reproducible y con usuarios, productos y carritos persistentes. La principal oportunidad de mejora es la **calidad de los datos que entran**: en el Sprint 7 se protege la base con validaciones en el back-end (Express Validator) y en el front-end (JavaScript), y se aprovecha para corregir los detalles pendientes del sprint anterior.
