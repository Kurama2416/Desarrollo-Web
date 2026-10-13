# 💻 Sprint 2 — Maquetación con Node.js + Express + EJS

Sitio web de **Manglü**, granizados artesanales colombianos. En este sprint se armó la estructura y estética del sitio (la maqueta) sobre una aplicación **Node.js + Express** con estructura **MVC** y vistas **EJS**.

---

## 📋 Tablero de trabajo

🔗 **[PEGAR AQUÍ EL ENLACE A TRELLO O GITHUB PROJECTS]**

---

## 📂 Estructura del proyecto

```
manglu/
├── app.js                 # Servidor Express
├── package.json
├── controllers/
│   ├── mainController.js  # Home, detalle de producto, carrito
│   └── authController.js  # Registro y login (maqueta)
├── routes/
│   ├── main.js
│   └── auth.js
├── data/
│   ├── products.js        # Productos y textos del sitio
│   └── cart.js            # Datos de ejemplo del carrito
├── views/
│   ├── partials/          # head, header, footer
│   ├── productos/
│   │   └── detalle.ejs
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

| Página | Ruta |
|---|---|
| Home | `/` |
| Detalle de producto | `/producto/:id` |
| Carrito de compras | `/carrito` |
| Registro | `/registro` |
| Login | `/login` |

---

## 🎯 Alcance del sprint

Este sprint trabaja **la estructura y estética del sitio**. Los formularios y el carrito se muestran como maqueta:

- Los botones del carrito (cantidad, eliminar, proceder al pago) aún no tienen funcionalidad.
- El login no autentica: muestra un error de ejemplo para visualizar ese estado.
- El registro muestra los errores de validación, pero no guarda usuarios.

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

- [`retro.md`](./retro.md) — Retrospectiva del sprint 1.
- Tablero de trabajo — enlace al inicio de este documento.

---

## 👥 Equipo de desarrollo

- **Oscar Javier Hernández Morales** — Sistemas / Desarrollo Web
- **Juan David Navarro Jiménez** — Sistemas / Desarrollo Web