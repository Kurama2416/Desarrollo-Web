const fs = require('fs');
const path = require('path');

// Archivo que hace de base de datos
const dbPath = path.join(__dirname, '..', 'database', 'products.json');

// Opciones que se ofrecen en el formulario
const categories = ['Granizados', 'Frutas', 'Toppings'];
const sizeOptions = ['Pequeño', 'Mediano', 'Grande', 'Único'];

// ===== Acceso al archivo JSON =====
function readProducts() {
  const raw = fs.readFileSync(dbPath, 'utf-8').trim();
  return raw ? JSON.parse(raw) : [];
}

function saveProducts(products) {
  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2) + '\n');
}

// ===== Datos del formulario =====
// Convierte lo que llega del formulario en un producto con los tipos correctos
function parseBody(body) {
  return {
    name: String(body.name ?? '').trim(),
    description: String(body.description ?? '').trim(),
    image: String(body.image ?? '').trim(),
    category: String(body.category ?? '').trim(),
    sizes: [].concat(body.sizes ?? []), // un checkbox llega como texto, varios como arreglo
    price: Number(body.price)
  };
}

// Revisa el producto y devuelve un objeto con los errores encontrados
function validateProduct(product, rawPrice) {
  const errors = {};

  if (product.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.';
  }
  if (!rawPrice || Number.isNaN(product.price) || product.price <= 0) {
    errors.price = 'Ingresa un precio válido, mayor que 0.';
  }
  if (!categories.includes(product.category)) {
    errors.category = 'Elige una categoría.';
  }
  if (product.sizes.length === 0 || !product.sizes.every((s) => sizeOptions.includes(s))) {
    errors.sizes = 'Elige al menos un tamaño.';
  }
  if (product.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.';
  }
  if (!/^(\/img\/|https?:\/\/)/.test(product.image)) {
    errors.image = 'Escribe una ruta como /img/mango.jpg o una URL que empiece con http.';
  }

  return errors;
}

// Datos que necesitan las vistas de crear y editar
const formData = { categories, sizeOptions };

const productController = {
  // GET /products — listado
  index: (req, res) => {
    res.render('index', {
      title: 'Productos | Manglü',
      products: readProducts()
    });
  },

  // GET /products/:id — detalle
  detail: (req, res) => {
    const products = readProducts();
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    // Otros 3 productos para la sección "También te puede gustar"
    const related = products.filter((p) => p.id !== product.id).slice(0, 3);

    res.render('detail', {
      title: `${product.name} | Manglü`,
      product,
      related
    });
  },

  // GET /products/create — formulario vacío
  createForm: (req, res) => {
    res.render('create', {
      title: 'Nuevo producto | Manglü',
      ...formData,
      errors: {},
      old: { sizes: [] }
    });
  },

  // POST /products — guardar producto nuevo
  store: (req, res) => {
    const newProduct = parseBody(req.body);
    const errors = validateProduct(newProduct, req.body.price);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('create', {
        title: 'Nuevo producto | Manglü',
        ...formData,
        errors,
        old: { ...newProduct, price: req.body.price ?? '' }
      });
    }

    const products = readProducts();
    // Id nuevo = el mayor existente + 1 (no se repite aunque se elimine alguno)
    const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    products.push({ id, ...newProduct });
    saveProducts(products);

    res.redirect('/products');
  },

  // GET /products/:id/edit — formulario con los datos actuales
  editForm: (req, res) => {
    const product = readProducts().find((p) => p.id === Number(req.params.id));
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('edit', {
      title: `Editar ${product.name} | Manglü`,
      ...formData,
      product,
      errors: {},
      old: product
    });
  },

  // PUT /products/:id — guardar cambios
  update: (req, res) => {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).send('Producto no encontrado');
    }

    const changes = parseBody(req.body);
    const errors = validateProduct(changes, req.body.price);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('edit', {
        title: `Editar ${products[index].name} | Manglü`,
        ...formData,
        product: products[index],
        errors,
        old: { ...changes, price: req.body.price ?? '' }
      });
    }

    // Se conserva el id y se reemplazan los demás campos
    products[index] = { id: products[index].id, ...changes };
    saveProducts(products);

    res.redirect('/products');
  },

  // DELETE /products/:id — eliminar
  destroy: (req, res) => {
    const products = readProducts();
    const exists = products.some((p) => p.id === Number(req.params.id));
    if (!exists) {
      return res.status(404).send('Producto no encontrado');
    }

    saveProducts(products.filter((p) => p.id !== Number(req.params.id)));
    res.redirect('/products');
  }
};

module.exports = productController;