# 💻 Sprint 5 — Usuarios, sesiones y middlewares

Sitio web de **Manglü**, granizados artesanales colombianos. Aplicación **Node.js + Express** con vistas **EJS** y datos en archivos **JSON**. En este sprint se agregaron los usuarios: registro con foto de perfil, login, logout, perfil, y rutas separadas para huéspedes y para usuarios con sesión.

---

## 📋 Tablero de trabajo

🔗 **[PEGAR AQUÍ EL ENLACE A TRELLO O GITHUB PROJECTS]**

---

## ✨ Qué se agregó en este sprint

- **Registro** con nombre, apellido, correo, contraseña y foto de perfil (opcional).
- **Contraseñas cifradas** con bcrypt: nunca se guardan en texto plano.
- **Subida de imágenes** con Multer (JPG, JPEG o PNG, hasta 2 MB).
- **Login y logout** con sesiones. El header muestra la foto y el nombre del usuario.
- **Perfil** del usuario.
- **Rutas de huéspedes y de usuarios**, con middlewares.

---

## 📂 Estructura del proyecto

```
Desarrollo-Web-Sprint_5/
├── .gitignore
├── package.json
├── README.md
├── retro.md
├── public/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/users/             # fotos de perfil (default.svg y las que suben los usuarios)
└── src/
    ├── index.js                  # Servidor Express (sesiones, cookies, rutas)
    ├── controllers/
    │   ├── mainController.js     # Inicio y carrito
    │   ├── authController.js     # Registro, login, logout y perfil
    │   └── productController.js  # CRUD de productos
    ├── database/
    │   ├── products.json
    │   ├── users.json            # Usuarios (contraseñas cifradas)
    │   ├── site.json
    │   └── cart.json
    ├── middlewares/
    │   ├── logger.js             # Registra cada petición
    │   ├── locals.js             # Datos disponibles en todas las vistas
    │   ├── auth.js               # loadUser, guestOnly y authOnly
    │   └── uploadAvatar.js       # Subida de la foto de perfil (Multer)
    ├── models/
    │   └── userModel.js          # Único archivo que lee y escribe users.json
    ├── routes/
    │   ├── main.routes.js
    │   ├── auth.routes.js
    │   └── products.routes.js
    └── views/
        ├── partials/             # head, header, footer, product-form
        ├── home.ejs
        ├── index.ejs             # Listado de productos
        ├── detail.ejs
        ├── create.ejs
        ├── edit.ejs
        ├── carrito.ejs
        ├── registro.ejs
        ├── login.ejs
        └── perfil.ejs
```

---

## 🌐 Rutas y quién puede entrar

| Método | Ruta | Acceso |
|---|---|---|
| GET | `/` | Todos |
| GET | `/carrito` | Todos |
| GET | `/products` | Todos |
| GET | `/products/:id` | Todos |
| GET / POST | `/registro` | Solo huéspedes |
| GET / POST | `/login` | Solo huéspedes |
| GET | `/perfil` | Solo usuarios |
| POST | `/logout` | Solo usuarios |
| GET | `/products/create` | Solo usuarios |
| POST | `/products` | Solo usuarios |
| GET | `/products/:id/edit` | Solo usuarios |
| PUT | `/products/:id` | Solo usuarios |
| DELETE | `/products/:id` | Solo usuarios |

- Las rutas **solo para huéspedes** redirigen al perfil si ya hay una sesión iniciada.
- Las rutas **solo para usuarios** redirigen al login si no hay sesión.
- `PUT` y `DELETE` se simulan desde los formularios con **method-override** (`?_method=PUT` y `?_method=DELETE`).

---

## 🗄️ Datos de usuarios (`users.json`)

| Campo | Descripción |
|---|---|
| `id` | Identificador único |
| `firstName` | Nombre |
| `lastName` | Apellido |
| `email` | Correo (único) |
| `password` | Contraseña cifrada con bcrypt |
| `category` | `admin` o `customer`. Quien se registra queda como `customer` |
| `image` | Ruta o URL de la foto de perfil |

---

## 🔒 Seguridad

- Contraseñas cifradas con **bcryptjs**.
- Al fallar el login se muestra el mismo mensaje, sin revelar si el correo existe.
- Se genera una sesión nueva al iniciar sesión.
- La cookie de sesión es `HttpOnly` y `SameSite=Lax`.
- En la sesión solo se guardan datos seguros: nunca la contraseña.
- La clave secreta de la sesión se toma de la variable de entorno `SESSION_SECRET`. Si no existe, se usa una clave de desarrollo.

---

## 🎯 Alcance del sprint

**Funciona:**
- Registro, login, logout y perfil.
- Subida de foto de perfil con validación de tipo y tamaño.
- Rutas de huéspedes y de usuarios.
- Crear, editar y eliminar productos solo con sesión iniciada.

**Limitaciones conocidas:**
- La función **"Recordarme"** (opcional) no está incluida en esta entrega.
- "¿Olvidaste tu contraseña?" sigue siendo maqueta.
- Las sesiones viven en memoria: al reiniciar el servidor hay que volver a iniciar sesión.
- La categoría `admin` todavía no tiene permisos distintos a los de `customer`.
- El carrito sigue siendo maqueta.

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

   Para desarrollo, con reinicio automático:

   ```bash
   npm run dev
   ```

4. Abrir <http://localhost:3000> en el navegador.

### Cuentas de prueba

Son datos inventados, creados solo para probar el sitio.

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | camila.rojas@example.com | `Mg#4821x` |
| Cliente | valentina.perez@example.com | `Vl$5512p` |

---

## 🧪 Cómo probar el flujo de usuarios

1. Entrar a `/registro`, enviar el formulario vacío y ver los errores. Luego completarlo, con o sin foto.
2. Iniciar sesión en `/login` con la cuenta creada.
3. Ver en el header la foto y el nombre, y abrir el **perfil**.
4. Con la sesión iniciada, escribir `/login` en la barra del navegador: redirige al perfil.
5. Cerrar sesión y escribir `/perfil` o `/products/create`: redirigen al login.

---

## 📝 Documentación ágil

- [`retro.md`](./retro.md) — Retrospectiva del sprint 4 (estrella de mar).
- Tablero de trabajo — enlace al inicio de este documento.

---

## 👥 Equipo de desarrollo

- **Oscar Javier Hernández Morales** — Sistemas / Desarrollo Web
- **Juan David Navarro Jiménez** — Sistemas / Desarrollo Web