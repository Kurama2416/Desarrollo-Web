# 🥭 Manglü — Sprint 6: Base de datos y Sequelize

Manglü es una aplicación web dedicada a la venta de granizados artesanales colombianos, desarrollada con **Node.js, Express y EJS**.

En el Sprint 6 se incorporó **MySQL como sistema de gestión de bases de datos** y **Sequelize como ORM**, permitiendo almacenar y administrar productos, usuarios, categorías, tamaños y carritos de compra de manera persistente.

## 📋 Tablero de trabajo

**Enlace:** [https://trello.com/invite/b/6aece6423bc5d9f074bd4651/ATTI8e2f0441fe128d6e03157640dc631f8e76B9FEC8/manglu-sprint-6-base-de-datos-y-sequelize]

## ✨ Funcionalidades del proyecto

### Funcionalidades desarrolladas en sprints anteriores

- Catálogo de productos y páginas de detalle.
- Creación, edición y eliminación de productos.
- Registro e inicio de sesión de usuarios.
- Cierre de sesión y perfil de usuario.
- Contraseñas cifradas mediante bcryptjs.
- Subida de imágenes con Multer.
- Middlewares de autenticación y control de acceso.
- Interfaz desarrollada con EJS, HTML, CSS y JavaScript.

### Funcionalidades implementadas en el Sprint 6

- Conexión de la aplicación con MySQL.
- Configuración de Sequelize.
- Creación de modelos y asociaciones.
- Migración del almacenamiento principal de productos y usuarios a la base de datos.
- Implementación del CRUD administrativo de usuarios.
- Persistencia de carritos y artículos.
- Creación de migraciones para reconstruir la estructura de la base de datos.
- Creación de seeders con información inicial del catálogo.
- Verificación de las migraciones y seeders en una base de datos de prueba.
- Elaboración del diagrama entidad-relación.

## 🛠️ Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Framework del servidor |
| EJS | Motor de plantillas |
| MySQL | Base de datos relacional |
| Sequelize | ORM y gestión de modelos |
| Sequelize CLI | Ejecución de migraciones y seeders |
| bcryptjs | Cifrado de contraseñas |
| Multer | Subida de imágenes |
| express-session | Gestión de sesiones |
| dotenv | Variables de entorno |
| Git y GitHub | Control de versiones |

## 🗄️ Modelo de base de datos

La base de datos está compuesta por siete tablas principales:

| Tabla | Descripción |
|---|---|
| `users` | Información de los usuarios y sus roles |
| `categories` | Categorías del catálogo |
| `sizes` | Tamaños disponibles |
| `products` | Productos de Manglü |
| `product_sizes` | Relación entre productos y tamaños |
| `carts` | Carritos asociados a usuarios |
| `cart_items` | Artículos almacenados en cada carrito |

### Relaciones principales

- Una categoría puede contener varios productos.
- Un producto puede estar disponible en varios tamaños.
- Un tamaño puede asociarse a varios productos.
- Un usuario puede tener varios carritos.
- Un carrito puede contener varios artículos.
- Cada artículo del carrito está relacionado con un producto y un tamaño.

### Diagrama entidad-relación (DER)

![Diagrama entidad-relación de Manglü](./docs/DER_Manglu.png)

El modelo editable de MySQL Workbench se encuentra en `docs/Manglu_Modelo_ER.mwb`.

## 📂 Estructura principal del proyecto

```text
Desarrollo-Web-Sprint_6/
├── config/
│   └── config.js
├── docs/
│   ├── DER_Manglu.png
│   └── Manglu_Modelo_ER.mwb
├── migrations/
│   ├── 20261105000100-create-users.js
│   ├── 20261105000200-create-categories.js
│   └── 20261105000300-create-remaining-tables.js
├── models/
├── seeders/
│   └── 20261105000400-demo-data.js
├── public/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── views/
│   └── index.js
├── .env
├── .gitignore
├── .sequelizerc
├── package.json
├── README.md
└── retro.md
```

**Nota:** el archivo `.env` es local y no debe subirse al repositorio.

## 🌐 Funcionalidades y rutas

| Ruta | Función |
|---|---|
| `/` | Página principal |
| `/products` | Catálogo de productos |
| `/products/:id` | Detalle de producto |
| `/registro` | Registro de usuarios |
| `/login` | Inicio de sesión |
| `/perfil` | Perfil del usuario |
| `/carrito` | Carrito de compras |
| `/admin/users` | Administración de usuarios |

El sistema incluye operaciones para crear, consultar, actualizar y eliminar productos y usuarios, sujetas a los permisos establecidos en las rutas correspondientes.

## 🚀 Instalación y ejecución

### 1. Requisitos

- Node.js y npm.
- MySQL Server.
- MySQL Workbench (recomendado).
- Git.

### 2. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd Desarrollo-Web-Sprint_6
```

Reemplazar `URL_DEL_REPOSITORIO` por el enlace real de GitHub.

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y configurar las variables necesarias:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=manglu_db
DB_USER=usuario_mysql
DB_PASSWORD=contraseña_mysql
SESSION_SECRET=clave_privada_de_sesion
```

Los valores deben corresponder a la instalación local de MySQL.

**Importante:** nunca publicar contraseñas reales ni el archivo `.env` en GitHub.

### 5. Crear la base de datos

Desde MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS manglu_db;
```

El usuario de MySQL configurado debe tener permisos suficientes sobre esta base de datos.

### 6. Ejecutar las migraciones

Para una base de datos nueva y vacía, ejecutar:

```bash
npx sequelize-cli db:migrate --env development
```

Las migraciones crean las siete tablas y sus relaciones.

**Advertencia:** no ejecutar las migraciones de creación sobre una base de datos que ya tenga las tablas creadas manualmente sin revisar primero su estado.

### 7. Ejecutar los seeders

Para cargar el catálogo inicial en una base de datos nueva:

```bash
npx sequelize-cli db:seed:all --env development
```

El seeder incluye:

| Datos iniciales | Cantidad |
|---|---:|
| Categorías | 3 |
| Tamaños | 4 |
| Productos | 9 |
| Relaciones producto-tamaño | 24 |
| **Total** | **40** |

Estos datos corresponden al catálogo inicial. No incluyen cuentas de usuario ni carritos personales.

### 8. Iniciar el servidor

```bash
npm start
```

Abrir en el navegador:

http://localhost:3000

## 🧪 Pruebas realizadas

Se utilizó una base de datos independiente llamada `manglu_test` para comprobar el funcionamiento de las migraciones y seeders.

Se verificó:

- Creación de las siete tablas mediante migraciones.
- Creación de las relaciones y claves foráneas.
- Inserción de los 40 registros iniciales.
- Consulta de los registros desde MySQL Workbench.
- Funcionamiento del CRUD de productos.
- Funcionamiento del CRUD administrativo de usuarios.
- Persistencia del carrito de compras.
- Conservación de los datos tras reiniciar el servidor.

La base de datos principal `manglu_db` se mantuvo separada de las pruebas.

## 🔒 Seguridad

- Las contraseñas de usuarios se almacenan cifradas.
- Se utilizan sesiones para la autenticación.
- Las rutas protegidas requieren iniciar sesión.
- Las funcionalidades administrativas están restringidas según el rol.
- Las credenciales de la base de datos se configuran mediante variables de entorno.
- El archivo `.env` debe excluirse del repositorio mediante `.gitignore`.

## 📝 Documentación ágil

- `retro.md`: retrospectiva del proyecto.
- `docs/DER_Manglu.png`: diagrama entidad-relación.
- `docs/Manglu_Modelo_ER.mwb`: modelo editable de la base de datos.
- Tablero de trabajo: pendiente de agregar el enlace.

## 👥 Equipo de desarrollo

- **Oscar Javier Hernández Morales** — Sistemas / Desarrollo Web
- **Juan David Navarro Jiménez** — Sistemas / Desarrollo Web

## 🎯 Conclusión del Sprint 6

Durante este sprint se fortaleció la arquitectura de Manglü mediante la implementación de una base de datos relacional con MySQL y Sequelize. Esto permitió reemplazar el almacenamiento principal basado en archivos JSON por un sistema persistente, organizar las relaciones entre las entidades y mejorar la administración de usuarios, productos y carritos.

Adicionalmente, las migraciones y seeders permiten reproducir la estructura y los datos iniciales del catálogo en una nueva base de datos, facilitando las pruebas, el mantenimiento y la continuidad del desarrollo.