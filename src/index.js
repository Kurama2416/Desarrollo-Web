// ============================================================
// IMPORTACIÓN DE MÓDULOS
// ============================================================
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { loadUser } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Clave con la que se firman la sesión y las cookies.
// En un sitio real debe venir de una variable de entorno (SESSION_SECRET).
const SESSION_SECRET = process.env.SESSION_SECRET || 'manglu-clave-secreta-de-desarrollo';

// Motor de vistas: EJS, con las plantillas en src/views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================================
// MIDDLEWARES GLOBALES (se ejecutan en orden, de arriba hacia abajo)
// ============================================================

// Lee los datos que llegan de formularios y en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Permite simular PUT y DELETE desde un formulario HTML (?_method=PUT)
app.use(methodOverride('_method'));

// Registra cada petición en consola
app.use(require('./middlewares/logger'));

// Archivos estáticos (css, js, img) desde /public, que está fuera de src.
// Van antes de la sesión para que cargar una imagen no abra una sesión.
app.use(express.static(path.join(__dirname, '..', 'public')));

// Cookies (firmadas con la clave secreta) y sesiones
app.use(cookieParser(SESSION_SECRET));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,            // no vuelve a guardar la sesión si no cambió
  saveUninitialized: false, // no crea sesión (ni cookie) para quien no inició sesión
  cookie: { httpOnly: true, sameSite: 'lax' } // la cookie no es accesible desde JavaScript
}));

// Deja datos y funciones disponibles en todas las vistas
app.use(require('./middlewares/locals'));

// Deja al usuario logueado (o null) disponible en todas las vistas
app.use(loadUser);

// ============================================================
// RUTAS
// ============================================================
const mainRoutes = require('./routes/main.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const adminUsersRoutes = require('./routes/adminUsers.routes');


app.use('/', mainRoutes);            // home, carrito
app.use('/', authRoutes);            // registro, login, logout
app.use('/products', productRoutes); // CRUD de productos
app.use('/admin/users', adminUsersRoutes); // CRUD de usuarios (solo admin)
// ============================================================
// ERROR 404 Y ARRANQUE DEL SERVIDOR
// ============================================================
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor Manglü corriendo en http://localhost:${PORT}`);
});