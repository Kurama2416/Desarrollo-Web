# 💻 Sprint 3 — Catálogo de productos con Node.js + Express + EJS

Sitio web de **Manglü**, granizados artesanales colombianos. Aplicación **Node.js + Express** con estructura **MVC** y vistas **EJS**. En este sprint se agregó la gestión de productos: listado, formulario de carga y formulario de edición.

---

## 📋 Tablero de trabajo

🔗 **[PEGAR AQUÍ EL ENLACE A TRELLO O GITHUB PROJECTS]**

---

## 📂 Estructura del proyecto

```
Desarrollo-Web-Sprint_3/
├── app.js                     # Servidor Express
├── package.json
├── models/
│   └── productModel.js        # Listar, buscar, crear y editar productos
├── controllers/
│   ├── mainController.js      # Home, detalle y carrito
│   ├── authController.js      # Registro y login (maqueta)
│   └── productController.js   # Listado, crear y editar productos
├── routes/
│   ├── main.js
│   ├── auth.js
│   └── products.js
├── data/
│   ├── products.js            # Productos y textos del sitio
│   └── cart.js                # Datos de ejemplo del carrito
├── views/
│   ├── partials/              # head, header, footer, product-form
│   ├── productos/             # index, detalle, crear, editar
│   ├── index.ejs
│   ├── carrito.ejs
│   ├── registro.ejs
│   └── login.ejs
├── public/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
├── retro.md
└── README.md
```

---

## 🌐 Páginas y rutas

| Método | Ruta | Página |
|---|---|---|
| GET | `/` | Home |
| GET | `/productos` | Listado de productos |
| GET | `/producto/:id` | Detalle de producto |
| GET | `/productos/crear` | Formulario de carga de producto |
| POST | `/productos` | Guardar producto nuevo |
| GET | `/productos/:id/editar` | Formulario de edición |
| POST | `/productos/:id/editar` | Guardar cambios |
| GET | `/carrito` | Carrito de compras |
| GET / POST | `/registro` | Registro |
| GET / POST | `/login` | Login |

---

## 🎯 Alcance del sprint

**Funciona:**
- Listado de productos con enlaces al detalle y a la edición.
- Crear y editar productos con validación de los campos y mensajes de error visibles.
- Los cambios se reflejan en el home y en el detalle.

**Limitaciones conocidas:**
- Los productos se guardan **en memoria**: al reiniciar el servidor se pierden los cambios.
- El carrito, el registro y el login siguen siendo maqueta (no guardan ni autentican).

---

## 🚀 Cómo ejecutar el proyecto

1. Instalar [Node.js](https://nodejs.org/) (versión 18 o superior).
2. Instalar las dependencias:

```bash
   npm install
```

3. Abrir <http://localhost:3000> en el navegador.

---

## 📝 Documentación ágil

- [`retro.md`](./retro.md) — Retrospectiva del sprint 2 (estrella de mar).
- Tablero de trabajo — enlace al inicio de este documento.

---

## 👥 Equipo de desarrollo

- **Oscar Javier Hernández Morales** — Sistemas / Desarrollo Web
- **Juan David Navarro Jiménez** — Sistemas / Desarrollo Web
