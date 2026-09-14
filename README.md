# Informe de Práctica: Sistema CLI de Gestión de Tareas

**Asignatura:** Programación / Desarrollo Web con Node.js  
**Módulo:** Manejo de Archivos (`fs`), Módulos Internos y Argumentos CLI (`process.argv`)  
**Entorno de Ejecución:** Node.js v14+

---

## 1. Descripción del Proyecto

El presente proyecto consiste en el desarrollo de una aplicación de consola (CLI) construida sobre **Node.js**. Su objetivo principal es aplicar la persistencia de datos local mediante el módulo nativo `fs` (File System) y la manipulación de arreglos de objetos JSON. 

La aplicación permite realizar un flujo de operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre un listado de tareas a través de comandos ingresados desde la terminal.

---

## 2. Arquitectura y Estructura de Archivos

La solución está modularizada para separar la lógica de presentación/interacción con el usuario de la lógica de manipulación de datos:

* **`app.js`**: Funciona como el punto de entrada principal (Controlador/CLI). Captura y evalúa los parámetros ingresados en la consola (`process.argv`) enviando las peticiones a la capa de lógica.
* **`funciondetareas.js`**: Módulo encargado de la lógica de negocio. Realiza la lectura y escritura sincrónica en el sistema de archivos (`fs.readFileSync` y `fs.writeFileSync`), además de aplicar métodos de arreglos (`filter`, `map`, `push`).
* **`tareas.json`**: Fuente de datos estática en formato JSON que almacena el arreglo con la lista de tareas y sus respectivos estados (`pendiente`, `en proceso`, `terminada`).

---

## 3. Funcionalidades Implementadas

1. **Lectura y Listado:** Carga el archivo `.json` y parsea los datos para mostrarlos en consola.
2. **Creación:** Permite registrar una nueva tarea asignándole por defecto el estado `pendiente`.
3. **Inicio Rápido:** Cambia de forma directa el estado de una tarea específica a `en proceso`.
4. **Filtrado:** Utiliza el método `.filter()` para retornar solo las tareas que coincidan con un estado determinado.
5. **Edición de Estado:** Actualiza el estado de cualquier tarea existente (`map()`).
6. **Eliminación:** Filtra y remueve del arreglo todas las tareas asociadas a un estado en particular y guarda los cambios persistentes.

---

## 4. Guía de Ejecución y Pruebas

Para probar el correcto funcionamiento del sistema, ejecute los siguientes comandos en la terminal desde la raíz del proyecto:

```bash
# 1. Listar todas las tareas almacenadas
node app.js listar

# 2. Crear una nueva tarea (estado inicial: pendiente)
node app.js crear "Avanzar proyecto"

# 3. Iniciar la tarea (cambia estado a 'en proceso')
node app.js iniciar "Avanzar proyecto"

# 4. Filtrar tareas por estado
node app.js filtrar "en proceso"

# 5. Cambiar el estado manualmente a 'terminada'
node app.js cambiarEstado "Avanzar proyecto" "terminada"

# 6. Eliminar todas las tareas terminadas
node app.js eliminarPorEstado "terminada"
```
