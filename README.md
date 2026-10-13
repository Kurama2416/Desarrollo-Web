# 💻 Sprint 4 — CRUD de productos con Node.js + Express + EJS

Sitio web de **Manglü**, granizados artesanales colombianos. Aplicación **Node.js + Express** con vistas **EJS** y los datos guardados en archivos **JSON**. En este sprint se implementó la administración completa de productos: listado, detalle, creación, edición y eliminación.

---

## 📋 Tablero de trabajo

🔗 **[PEGAR AQUÍ EL ENLACE A TRELLO O GITHUB PROJECTS]**

---

## 📂 Estructura del proyecto

```
Desarrollo-Web-Sprint_4/
├── .gitignore
├── package.json
├── README.md
├── retro.md
├── public/
│   ├── css/styles.css
│   └── js/main.js
└── src/
    ├── index.js                      # Servidor Express
    ├── controllers/
    │   ├── mainController.js         # Inicio y carrito
    │   ├── authController.js         # Registro y login (maqueta)
    │   └── productController.js      # CRUD de productos
    ├── database/
    │   ├── products.json             # Datos de productos
    │   ├── users.json                # Datos de usuarios
    │   ├── site.json                 # Textos del sitio (menú, portada, galería...)
    │   └── cart.json                 # Carrito de ejemplo
    ├── middlewares/
    │   ├── logger.js                 # Registra cada petición en consola
    │   └── locals.js                 # Deja datos y funciones disponibles en las vistas
    ├── routes/
    │   ├── main.routes.js
    │   ├── auth.routes.js
    │   └── products.routes.js
    └── views/
        ├── partials/                 # head, header, footer, product-form
        ├── home.ejs                  # Inicio
        ├── index.ejs                 # Listado de productos
        ├── detail.ejs                # Detalle de producto
        ├── create.ejs                # Formulario de creación
        ├── edit.ejs                  # Formulario de edición
        ├── carrito.ejs
        ├── registro.ejs
        └── login.ejs
```

La estructura de `src/` sigue la del ejemplo entregado por el profesor. El inicio se llama `home.ejs` porque `index.ejs` es el listado de productos.

---

## 🌐 Rutas

### CRUD de productos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/products` | Listado de productos |
| GET | `/products/create` | Formulario de creación |
| GET | `/products/:id` | Detalle de un producto |
| POST | `/products` | Acción de creación |
| GET | `/products/:id/edit` | Formulario de edición |
| PUT | `/products/:id` | Acción de edición |
| DELETE | `/products/:id` | Acción de borrado |

Los navegadores solo envían GET y POST desde un formulario, así que `PUT` y `DELETE` se simulan con el paquete **method-override** (`?_method=PUT` y `?_method=DELETE`).

### Otras páginas

| Método | Ruta | Página |
|---|---|---|
| GET | `/` | Inicio |
| GET | `/carrito` | Carrito de compras |
| GET / POST | `/registro` | Registro |
| GET / POST | `/login` | Login |

---

## 🗄️ Datos (JSON)

**`src/database/products.json`**

| Campo | Descripción |
|---|---|
| `id` | Identificador único |
| `name` | Nombre del producto |
| `description` | Descripción |
| `image` | Ruta o URL de la imagen |
| `category` | Granizados, Frutas o Toppings |
| `sizes` | Tamaños disponibles |
| `price` | Precio en pesos colombianos |

**`src/database/users.json`:** `id`, `firstName`, `lastName`, `email`, `password`, `category` e `image`. Son datos de ejemplo, generados para probar el sitio.

Los productos que se crean, editan o eliminan se guardan en `products.json`, así que los cambios **se conservan al reiniciar el servidor**.

**Imágenes:** los productos de ejemplo usan imágenes de Unsplash (por URL). Para usar una imagen propia, guarda el archivo en `public/img/` y escribe su ruta en el formulario, por ejemplo `/img/mango.jpg`.

---

## ✅ Validaciones del formulario

Al crear o editar un producto, el servidor revisa los campos y vuelve a mostrar el formulario con los errores marcados, conservando lo que se escribió:

- Nombre de al menos 3 caracteres.
- Precio numérico mayor que 0.
- Categoría elegida de la lista.
- Al menos un tamaño.
- Descripción de al menos 10 caracteres.
- Imagen con una ruta que empiece por `/img/` o una URL `http`.

---

## 🎯 Alcance del sprint

**Funciona:**
- Listado, detalle, creación, edición y eliminación de productos, con persistencia en JSON.
- Validación de formularios con mensajes de error visibles.
- Los cambios se reflejan en el inicio y en el listado.

**Sigue siendo maqueta (fuera del alcance de este sprint):**
- El carrito muestra datos de ejemplo y sus botones no tienen funcionalidad.
- El registro y el login no guardan ni autentican usuarios.
- `users.json` solo contiene los datos; todavía no se usa en ninguna pantalla.

---

## 🚀 Cómo ejecutar el proyecto

1. Instalar [Node.js](https://nodejs.org/) (versión 18 o superior).
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor:

   ```bash
   npm start
   ```

   Para desarrollo, con reinicio automático al guardar cambios:

   ```bash
   npm run dev
   ```

4. Abrir <http://localhost:3000> en el navegador.

---

## 🧪 Cómo probar el CRUD

1. Entrar a **Productos** desde el menú y ver el listado.
2. Abrir **Ver detalle** de un producto.
3. Pulsar **+ Nuevo producto**: enviarlo vacío (se ven los errores) y luego completo.
4. Pulsar **Editar** en ese producto, cambiar un dato y guardar.
5. Pulsar **Eliminar** y confirmar el aviso.
6. Reiniciar el servidor y comprobar que los cambios se conservan.

---

## 📝 Documentación ágil

- [`retro.md`](./retro.md) — Retrospectiva del sprint 3 (estrella de mar).
- Tablero de trabajo — enlace al inicio de este documento.

---

## 👥 Equipo de desarrollo

- **Oscar Javier Hernández Morales** — Sistemas / Desarrollo Web
- **Juan David Navarro Jiménez** — Sistemas / Desarrollo Web