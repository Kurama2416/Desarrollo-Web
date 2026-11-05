
const db = require('../../models');

const { Product, Category, Size, sequelize, Sequelize } = db;
const { Op } = Sequelize;

// Opciones utilizadas en los formularios
const categories = ['Granizados', 'Frutas', 'Toppings'];
const sizeOptions = ['Pequeño', 'Mediano', 'Grande', 'Único'];

const formData = { categories, sizeOptions };

// Convertir los datos del formulario
function parseBody(body) {
  return {
    name: String(body.name ?? '').trim(),
    description: String(body.description ?? '').trim(),
    image: String(body.image ?? '').trim(),
    category: String(body.category ?? '').trim(),
    sizes: [...new Set(
      [].concat(body.sizes ?? []).map(s => String(s))
    )],
    price: Number(body.price)
  };
}

// Validar la información del producto
function validateProduct(product, rawPrice) {
  const errors = {};

  if (product.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (
    String(rawPrice ?? '').trim() === '' ||
    !Number.isFinite(product.price) ||
    product.price <= 0
  ) {
    errors.price = 'Ingresa un precio válido, mayor que 0.';
  }

  if (!categories.includes(product.category)) {
    errors.category = 'Elige una categoría.';
  }

  if (
    product.sizes.length === 0 ||
    !product.sizes.every(s => sizeOptions.includes(s))
  ) {
    errors.sizes = 'Elige al menos un tamaño.';
  }

  if (product.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.';
  }

  if (!/^(\/img\/|https?:\/\/)/.test(product.image)) {
    errors.image =
      'Escribe una ruta como /img/mango.jpg o una URL válida.';
  }

  return errors;
}

// Obtener producto con categoría y tamaños
async function findProduct(id) {
  const product = await Product.findByPk(id, {
    include: [
      { model: Category, as: 'category' },
      {
        model: Size,
        as: 'sizes',
        through: { attributes: [] }
      }
    ]
  });

  return product ? formatProduct(product) : null;
}

// Mantener el formato que esperan las vistas EJS
function formatProduct(product) {
  const data = product.get({ plain: true });

  return {
    ...data,
    category: data.category?.name ?? '',
    sizes: data.sizes?.map(size => size.name) ?? [],
    price: Number(data.price)
  };
}

// Buscar categoría y tamaños válidos
async function findRelations(data, transaction) {
  const category = await Category.findOne({
    where: { name: data.category },
    transaction
  });

  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  const sizes = await Size.findAll({
    where: { name: { [Op.in]: data.sizes } },
    transaction
  });

  if (sizes.length !== data.sizes.length) {
    throw new Error('Uno o más tamaños no existen');
  }

  return { category, sizes };
}

const productController = {

  // GET /products

  index: async (req, res) => {
    try {
      // Obtener el texto escrito en la búsqueda
      const search = String(req.query.search ?? '').trim();

      // Filtrar productos por nombre cuando exista una búsqueda
      const where = search
        ? { name: { [Op.like]: `%${search}%` } }
        : {};

      const productsDB = await Product.findAll({
        where,
        include: [
          { model: Category, as: 'category' },
          {
            model: Size,
            as: 'sizes',
            through: { attributes: [] }
          }
        ],
        order: [['id', 'ASC']]
      });

      res.render('index', {
        title: 'Productos | Manglü',
        products: productsDB.map(formatProduct),
        search
      });

    } catch (error) {
      console.error('Error al buscar productos:', error);
      res.status(500).send('Error al cargar los productos');
    }
  },


  // GET /products/:id
  detail: async (req, res) => {
    try {
      const product = await findProduct(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const relatedDB = await Product.findAll({
        where: { id: { [Op.ne]: product.id } },
        include: [
          { model: Category, as: 'category' },
          {
            model: Size,
            as: 'sizes',
            through: { attributes: [] }
          }
        ],
        order: [['id', 'ASC']],
        limit: 3
      });

      res.render('detail', {
        title: `${product.name} | Manglü`,
        product,
        related: relatedDB.map(formatProduct)
      });

    } catch (error) {
      console.error('Error al mostrar producto:', error);
      res.status(500).send('Error al cargar el producto');
    }
  },

  // GET /products/create
  createForm: (req, res) => {
    res.render('create', {
      title: 'Nuevo producto | Manglü',
      ...formData,
      errors: {},
      old: { sizes: [] }
    });
  },

  // POST /products
  store: async (req, res) => {
    const data = parseBody(req.body);
    const errors = validateProduct(data, req.body.price);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('create', {
        title: 'Nuevo producto | Manglü',
        ...formData,
        errors,
        old: { ...data, price: req.body.price ?? '' }
      });
    }

    try {
      await sequelize.transaction(async transaction => {
        const { category, sizes } =
          await findRelations(data, transaction);

        const product = await Product.create({
          name: data.name,
          description: data.description,
          image: data.image,
          price: data.price,
          category_id: category.id
        }, { transaction });

        await product.addSizes(sizes, { transaction });
      });

      res.redirect('/products');

    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).send('Error al guardar el producto');
    }
  },

  // GET /products/:id/edit
  editForm: async (req, res) => {
    try {
      const product = await findProduct(req.params.id);

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

    } catch (error) {
      console.error('Error al abrir edición:', error);
      res.status(500).send('Error al cargar el formulario');
    }
  },

  // PUT /products/:id
  update: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const data = parseBody(req.body);
      const errors = validateProduct(data, req.body.price);

      if (Object.keys(errors).length > 0) {
        return res.status(400).render('edit', {
          title: `Editar ${product.name} | Manglü`,
          ...formData,
          product: await findProduct(product.id),
          errors,
          old: { ...data, price: req.body.price ?? '' }
        });
      }

      await sequelize.transaction(async transaction => {
        const { category, sizes } =
          await findRelations(data, transaction);

        await product.update({
          name: data.name,
          description: data.description,
          image: data.image,
          price: data.price,
          category_id: category.id
        }, { transaction });

        await product.setSizes(sizes, { transaction });
      });

      res.redirect('/products');

    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).send('Error al actualizar el producto');
    }
  },

  // DELETE /products/:id
  destroy: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      await product.destroy();

      res.redirect('/products');

    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).send(
        'No se pudo eliminar el producto. Puede estar asociado a un carrito.'
      );
    }
  }
};

module.exports = productController;
