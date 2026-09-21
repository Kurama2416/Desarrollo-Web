const express = require('express');
const path = require('path');
const mangluData = require('./data');

const app = express();
const PORT = 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Datos enviados por formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Página principal
app.get('/', (req, res) => {
    res.render('index', {
        data: mangluData
    });
});
// Página de productos
app.get('/productos', (req, res) => {
    res.render('productos/index', {
        data: mangluData
    });
});
// Formulario para crear producto
app.get('/productos/crear', (req, res) => {
    res.render('productos/crear', {
        data: mangluData
    });
});
// Crear producto
app.post('/productos', (req, res) => {

    const nuevoProducto = {
        id: mangluData.productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        tag: req.body.tag,
        tagColor: req.body.tagColor,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    };

    mangluData.productos.push(nuevoProducto);

    res.redirect('/productos');
});
// Formulario para editar producto
app.get('/productos/editar/:id', (req, res) => {

    const id = Number(req.params.id);

    const producto = mangluData.productos.find(
        producto => producto.id === id
    );

    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }

    res.render('productos/editar', {
        data: mangluData,
        producto: producto
    });
});


// Guardar cambios del producto
app.post('/productos/editar/:id', (req, res) => {

    const id = Number(req.params.id);

    const producto = mangluData.productos.find(
        producto => producto.id === id
    );

    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    producto.tag = req.body.tag;
    producto.tagColor = req.body.tagColor;
    producto.descripcion = req.body.descripcion;
    producto.imagen = req.body.imagen;

    res.redirect('/productos');
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});