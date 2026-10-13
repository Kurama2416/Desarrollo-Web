const data = require('../data/products');

// Limpia un texto recibido de un formulario
const limpiar = (valor) => String(valor ?? '').trim();

const productModel = {
  // Devuelve todos los productos
  findAll() {
    return data.productos;
  },

  // Busca un producto por id (devuelve null si no existe)
  findById(id) {
    return data.productos.find((p) => p.id === Number(id)) || null;
  },

  // Crea un producto nuevo y lo agrega a la lista
  create(campos) {
    // Id nuevo = el mayor existente + 1 (evita repetir ids si se elimina alguno)
    const nuevoId = data.productos.reduce((max, p) => Math.max(max, p.id), 0) + 1;

    const producto = {
      id: nuevoId,
      nombre: limpiar(campos.nombre),
      precio: Number(campos.precio),
      tag: limpiar(campos.tag),
      tagColor: limpiar(campos.tagColor),
      descripcion: limpiar(campos.descripcion),
      imagen: limpiar(campos.imagen)
    };

    data.productos.push(producto);
    return producto;
  },

  // Actualiza un producto existente (devuelve null si no existe)
  update(id, campos) {
    const producto = this.findById(id);
    if (!producto) return null;

    producto.nombre = limpiar(campos.nombre);
    producto.precio = Number(campos.precio);
    producto.tag = limpiar(campos.tag);
    producto.tagColor = limpiar(campos.tagColor);
    producto.descripcion = limpiar(campos.descripcion);
    producto.imagen = limpiar(campos.imagen);

    return producto;
  }
};

module.exports = productModel;