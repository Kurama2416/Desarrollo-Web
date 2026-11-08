const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '..', 'database');

// Lee un archivo JSON de src/database (siempre actualizado, sin caché)
function readJSON(file) {
  const raw = fs.readFileSync(path.join(dbDir, file), 'utf-8').trim();
  return raw ? JSON.parse(raw) : [];
}

const mainController = {
  // GET / — página de inicio
  home: (req, res) => {
    res.render('home', {
      products: readJSON('products.json')
    });
  },

  // GET /carrito — carrito de compras (maqueta con datos de ejemplo)
  cart: (req, res) => {
    const products = readJSON('products.json');
    const cart = readJSON('cart.json'); // { shipping, items: [{ productId, quantity }] }

    // Une cada ítem del carrito con los datos reales del producto
    const items = (cart.items || [])
      .map(({ productId, quantity }) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return null; // si el producto fue eliminado, se omite del carrito
        return { product, quantity, subtotal: product.price * quantity };
      })
      .filter(Boolean);

    const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
    const shipping = items.length ? (cart.shipping || 0) : 0;

    res.render('carrito', {
      title: 'Carrito | Manglü',
      items,
      subtotal,
      shipping,
      total: subtotal + shipping
    });
  }
};

module.exports = mainController;