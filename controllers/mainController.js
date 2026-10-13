const data = require('../data/products');
const cartSample = require('../data/cart');

// Convierte 8000 en "$8.000"
function formatPrice(value) {
  return '$' + Number(value).toLocaleString('es-CO');
}

const wppLink = `https://wa.me/${data.empresa.telefonoWhatsApp}`;

const mainController = {
  home: (req, res) => {
    res.render('index', {
      data,
      formatPrice,
      wppLink
    });
  },

  productDetail: (req, res) => {
    const id = Number(req.params.id);
    const producto = data.productos.find(p => p.id === id);

    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }

    // Otros 3 productos para la sección "También te puede gustar"
    const relacionados = data.productos
      .filter(p => p.id !== producto.id)
      .slice(0, 3);

    res.render('productos/detalle', {
      title: `${producto.nombre} | Manglü`,
      data,
      producto,
      relacionados,
      formatPrice,
      wppLink
    });
  },

  cart: (req, res) => {
    // Une cada ítem del carrito con los datos reales del producto
    const items = cartSample.items
      .map(({ productId, cantidad }) => {
        const producto = data.productos.find(p => p.id === productId);
        if (!producto) return null;
        return { producto, cantidad, subtotal: producto.precio * cantidad };
      })
      .filter(Boolean);

    const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
    const envio = items.length ? cartSample.envio : 0;

    res.render('carrito', {
      title: 'Carrito | Manglü',
      data,
      items,
      subtotal,
      envio,
      total: subtotal + envio,
      formatPrice,
      wppLink
    });
  }
};

module.exports = mainController;