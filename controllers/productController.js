const data = require('../data/products');
const productModel = require('../models/productModel');

// Convierte 8000 en "$8.000"
function formatPrice(value) {
  return '$' + Number(value).toLocaleString('es-CO');
}

// Colores de etiqueta disponibles (coinciden con las clases .tag-* del CSS)
const coloresTag = [
  { valor: 'yellow', nombre: 'Amarillo' },
  { valor: 'green', nombre: 'Verde' },
  { valor: 'red', nombre: 'Rojo' },
  { valor: 'purple', nombre: 'Morado' }
];

// Revisa los campos del formulario y devuelve un objeto con los errores
function validarProducto(body) {
  const errors = {};
  const nombre = String(body.nombre ?? '').trim();
  const tag = String(body.tag ?? '').trim();
  const descripcion = String(body.descripcion ?? '').trim();
  const imagen = String(body.imagen ?? '').trim();
  const precio = Number(body.precio);

  if (nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }
  if (!body.precio || Number.isNaN(precio) || precio <= 0) {
    errors.precio = 'Ingresa un precio válido, mayor que 0.';
  }
  if (tag.length < 2 || tag.length > 20) {
    errors.tag = 'La etiqueta debe tener entre 2 y 20 caracteres.';
  }
  if (!coloresTag.some((c) => c.valor === body.tagColor)) {
    errors.tagColor = 'Elige un color de etiqueta.';
  }
  if (descripcion.length < 10) {
    errors.descripcion = 'La descripción debe tener al menos 10 caracteres.';
  }
  if (!/^(\/img\/|https?:\/\/)/.test(imagen)) {
    errors.imagen = 'Escribe una ruta como /img/mango.jpg o una URL que empiece con http.';
  }

  return errors;
}

const productController = {
  // GET /productos — listado
  index: (req, res) => {
    res.render('productos/index', {
      title: 'Productos | Manglü',
      data,
      productos: productModel.findAll(),
      formatPrice
    });
  },

  // GET /productos/crear — formulario vacío
  createForm: (req, res) => {
    res.render('productos/crear', {
      title: 'Nuevo producto | Manglü',
      data,
      coloresTag,
      errors: {},
      old: {}
    });
  },

  // POST /productos — guardar producto nuevo
  store: (req, res) => {
    const errors = validarProducto(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('productos/crear', {
        title: 'Nuevo producto | Manglü',
        data,
        coloresTag,
        errors,
        old: req.body
      });
    }

    productModel.create(req.body);
    res.redirect('/productos');
  },

  // GET /productos/:id/editar — formulario con los datos actuales
  editForm: (req, res) => {
    const producto = productModel.findById(req.params.id);
    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('productos/editar', {
      title: `Editar ${producto.nombre} | Manglü`,
      data,
      coloresTag,
      producto,
      errors: {},
      old: producto
    });
  },

  // POST /productos/:id/editar — guardar cambios
  update: (req, res) => {
    const producto = productModel.findById(req.params.id);
    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }

    const errors = validarProducto(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('productos/editar', {
        title: `Editar ${producto.nombre} | Manglü`,
        data,
        coloresTag,
        producto,
        errors,
        old: req.body
      });
    }

    productModel.update(req.params.id, req.body);
    res.redirect('/productos');
  }
};

module.exports = productController;