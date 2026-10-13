// ============================================================
// IMPORTACIÓN DE MÓDULOS
// ============================================================
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Deja datos y funciones disponibles en todas las vistas
app.use(require('./middlewares/locals'));

// Archivos estáticos (css, js, img) desde /public, que está fuera de src
app.use(express.static(path.join(__dirname, '..', 'public')));

// ============================================================
// RUTAS
// ============================================================
const mainRoutes = require('./routes/main.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');

app.use('/', mainRoutes);            // home, carrito
app.use('/', authRoutes);            // registro, login
app.use('/products', productRoutes); // CRUD de productos

// ============================================================
// ERROR 404 Y ARRANQUE DEL SERVIDOR
// ============================================================
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor Manglü corriendo en http://localhost:${PORT}`);
});