const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Motor de vistas: EJS, con las plantillas en /views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (css, js, img) servidos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Permite leer datos de formularios (registro, login y productos)
app.use(express.urlencoded({ extended: false }));

// Rutas
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/', productRoutes);

// Página no encontrada (por ahora un mensaje simple)
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor Manglü corriendo en http://localhost:${PORT}`);
});